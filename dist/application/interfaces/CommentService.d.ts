import { CommentResponseDto, CreateCommentDto, UpdateCommentDto } from "../dtos/CommentDto";
export interface CommentService {
    createComment(createCommentDto: CreateCommentDto): Promise<CommentResponseDto>;
    getCommentById(id: string): Promise<CommentResponseDto>;
    getCommentsByBlogId(blogId: string): Promise<CommentResponseDto[]>;
    getCommentsByAuthorId(authorId: string): Promise<CommentResponseDto[]>;
    getAllComments(): Promise<CommentResponseDto[]>;
    updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto>;
    deleteComment(id: string): Promise<void>;
}
