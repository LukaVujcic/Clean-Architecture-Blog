export interface CreateCommentDto {
    content: string;
    authorId: string;
    blogId: string;
}
export interface UpdateCommentDto {
    content: string;
}
export interface CommentResponseDto {
    id: string;
    content: string;
    authorId: string;
    blogId: string;
    createdAt: string;
    updatedAt: string;
}
