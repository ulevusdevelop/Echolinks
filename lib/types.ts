export interface Post {
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  date: string;
}

export interface Article {
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  date: string;
  tags: string[];
}
