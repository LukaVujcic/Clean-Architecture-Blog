export interface CreateLikeDto {
    userId: string;
    blogId: string;
}
export interface LikeResponseDto {
    id: string;
    userId: string;
    blogId: string;
    createdAt: string;
}
