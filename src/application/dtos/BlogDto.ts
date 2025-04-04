export interface CreateBlogDto {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
}

export interface BlogResponseDto {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
} 