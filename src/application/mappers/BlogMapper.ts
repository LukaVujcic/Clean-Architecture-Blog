import { Blog } from "../../domain/entities/Blog";
import { BlogResponseDto } from "../dtos/BlogDto";

export class BlogMapper {
  static toDto(blog: Blog): BlogResponseDto {
    return {
      id: blog.getId().toString(),
      title: blog.getTitle(),
      content: blog.getContent(),
      authorId: blog.getAuthorId().toString(),
      createdAt: blog.getCreatedAt().toISOString(),
      updatedAt: blog.getUpdatedAt().toISOString(),
      likes: blog.getLikes()
    };
  }
} 