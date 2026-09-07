// RECONSTRUCTED STAND-IN — see audit notes. Replace with your real file.
import { fetchAPI } from './base';
import { Article, Post } from './types';

export async function getArticles(count = 10): Promise<Article[]> {
  const data = await fetchAPI(
    `query AllPosts($count: Int) {
      posts(first: $count) {
        nodes {
          slug
          title
          content
          date
          tags { nodes { name } }
          featuredImage { node { sourceUrl } }
        }
      }
    }`,
    { count }
  );

  const nodes = data?.posts?.nodes || [];
  return nodes.map((n: any) => ({
    slug: n.slug,
    title: n.title,
    content: n.content,
    date: n.date,
    featuredImage: n.featuredImage?.node?.sourceUrl || '',
    tags: (n.tags?.nodes || []).map((t: any) => t.name),
  }));
}

export async function getPosts(count = 10): Promise<Post[]> {
  const articles = await getArticles(count);
  return articles;
}
