export interface Iposts {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost:
    | SharedPost
    | SharedPost2
    | SharedPost3
    | SharedPost4
    | SharedPost5
    | SharedPost6
    | SharedPost7
    | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment3 | TopComment | TopComment2 | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface SharedPost7 {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment3;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface TopComment3 {
  _id: string;
  content: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}

interface SharedPost6 {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  image: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface SharedPost5 {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment2;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface SharedPost4 {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment2;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface TopComment2 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

interface SharedPost3 {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface SharedPost2 {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface TopComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}

interface SharedPost {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
