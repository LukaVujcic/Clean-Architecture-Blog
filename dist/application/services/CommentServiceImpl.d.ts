import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { CommentResponseDto, CreateCommentDto, UpdateCommentDto } from "../dtos/CommentDto";
import { CommentService } from "../interfaces/CommentService";
import "reflect-metadata";
export declare class CommentServiceImpl implements CommentService {
    private commentRepository;
    constructor(commentRepository: CommentRepository);
    createComment(createCommentDto: CreateCommentDto): Promise<CommentResponseDto>;
    getCommentById(id: string): Promise<CommentResponseDto>;
    getCommentsByBlogId(blogId: string): Promise<CommentResponseDto[]>;
    getCommentsByAuthorId(authorId: string): Promise<CommentResponseDto[]>;
    getAllComments(): Promise<CommentResponseDto[]>;
    updateComment(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentResponseDto>;
    deleteComment(id: string): Promise<void>;
    private mapCommentToDto;
}
