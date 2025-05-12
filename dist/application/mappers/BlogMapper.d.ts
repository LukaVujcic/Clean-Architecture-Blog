import { Blog } from "../../domain/entities/Blog";
import { BlogResponseDto } from "../dtos/BlogDto";
export declare class BlogMapper {
    static toDto(blog: Blog): BlogResponseDto;
}
