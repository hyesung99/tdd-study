export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: Date;
  isResolved: boolean;
  likeCount: number;
  commentCount: number;
  isPublic: boolean;
}

export interface Comment {
  id: string;
  questionId: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface FilterOptions {
  keyword?: string;
  category?: string;
  isResolved?: boolean;
}

export type SortOption = 'latest' | 'likes' | 'comments';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
