// lib/auth.ts
// Talks directly to the WPGraphQL JWT login mutation set up in
// MEMBERPRESS-BACKEND-SETUP.md. Token is kept in localStorage since the
// frontend (Render) and WordPress (Hostinger) are on different domains —
// cookies can't be shared cleanly across them.

const WORDPRESS_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT || '';

const TOKEN_KEY = 'echolink_auth_token';
const REFRESH_KEY = 'echolink_refresh_token';

export type AuthUser = {
  id: string;
  name: string;
  hasActiveMembership: boolean;
  activeMemberships: string[];
};

type LoginResult =
  | { success: true; user: AuthUser }
  | { success: false; error: string };

async function graphqlRequest(query: string, variables: Record<string, unknown>) {
  const res = await fetch(WORDPRESS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL request failed');
  }
  return json.data;
}

export async function login(username: string, password: string): Promise<LoginResult> {
  try {
    const data = await graphqlRequest(
      `mutation Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
          authToken
          refreshToken
          user {
            id
            name
            hasActiveMembership
            activeMemberships
          }
        }
      }`,
      { username, password }
    );

    const { authToken, refreshToken, user } = data.login;
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);

    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Login failed',
    };
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Fetches the current user's profile + membership status using the
// stored token. Call this on app load to restore a session.
export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(WORDPRESS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query Me {
          viewer {
            id
            name
            hasActiveMembership
            activeMemberships
          }
        }`,
      }),
    });
    const json = await res.json();
    if (json.errors || !json.data?.viewer) {
      logout(); // token expired/invalid — clear it
      return null;
    }
    return json.data.viewer;
  } catch {
    return null;
  }
}
