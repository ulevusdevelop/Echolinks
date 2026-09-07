# MemberPress Auth Bridge — WordPress Side Setup

## 1. Install a JWT auth plugin for WPGraphQL

WPGraphQL doesn't include login/auth out of the box. Install:

**WPGraphQL JWT Authentication** (by Josh Pollock / WPGraphQL community —
search "wp-graphql-jwt-authentication" in Plugins → Add New, or install
via the GitHub repo if it's not in the WP.org directory for your version).

This adds a `login` mutation to your GraphQL schema that accepts a
username/password and returns a JWT token, plus a refresh mutation.

After activating, add this to `wp-config.php` (generate a random 64+
character string for the secret — use a password generator, don't reuse
another secret):

```php
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'replace-with-a-long-random-secret');
```

## 2. Expose MemberPress membership status to GraphQL

MemberPress stores membership/subscription data in its own tables
(`MeprUser`, `MeprProduct`, `MeprTransaction`). Add this snippet to your
theme's `functions.php` (or a small custom plugin, cleaner if you don't
want to touch the theme):

```php
add_action('graphql_register_types', function () {
    register_graphql_field('User', 'activeMemberships', [
        'type' => ['list_of' => 'String'],
        'description' => 'Titles of the MemberPress memberships this user currently has active.',
        'resolve' => function ($user) {
            if (!class_exists('MeprUser')) {
                return [];
            }

            $mepr_user = new MeprUser($user->userId);
            $active_products = $mepr_user->active_product_subscriptions('products');

            if (empty($active_products)) {
                return [];
            }

            return array_map(function ($product_id) {
                $product = get_post($product_id);
                return $product ? $product->post_title : null;
            }, $active_products);
        },
    ]);

    register_graphql_field('User', 'hasActiveMembership', [
        'type' => 'Boolean',
        'description' => 'Whether this user has any active MemberPress membership.',
        'resolve' => function ($user) {
            if (!class_exists('MeprUser')) {
                return false;
            }
            $mepr_user = new MeprUser($user->userId);
            return !empty($mepr_user->active_product_subscriptions('products'));
        },
    ]);
});
```

## 3. Confirm it works

In a GraphQL client (or WPGraphQL's built-in IDE at
`/wp-admin/admin.php?page=graphiql-ide` if WPGraphiQL is installed), run:

```graphql
mutation Login {
  login(input: { username: "test@example.com", password: "yourpassword" }) {
    authToken
    refreshToken
    user {
      id
      name
      hasActiveMembership
      activeMemberships
    }
  }
}
```

You should get back a token and the user's membership status. If
`hasActiveMembership` always returns `false` even for a member, double
check the MemberPress product IDs are actually "products" type
(MemberPress sometimes uses `memberpress_product` or plain `products`
depending on version — confirm the exact param via
`var_dump($mepr_user->active_product_subscriptions())` temporarily).

## 4. CORS + cookie note

Since the frontend and WordPress live on different domains (Render vs.
Hostinger), the JWT gets stored client-side (localStorage, handled in
the Next.js code) rather than relying on WordPress cookies — cookies
don't cross domains cleanly. This is standard for headless setups but
means logout/session behavior is fully controlled by the frontend code,
not WordPress's normal login state.
