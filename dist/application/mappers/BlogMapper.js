"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogMapper = void 0;
class BlogMapper {
    static toDto(blog) {
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
exports.BlogMapper = BlogMapper;
//# sourceMappingURL=BlogMapper.js.map