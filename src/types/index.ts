export interface NewsItem {
  objectID: string;
  title: string;
  url?: string;
  author: string;
  created_at: string;
  upvotes?: number;
  downvotes?: number;
  voteStatus?: 'upvote' | 'downvote' | null; a
  content?: string;
}
