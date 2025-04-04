import { CommentRepository } from "../../../src/domain/ports/CommentRepository";
import { Comment, CommentId } from "../../../src/domain/entities/Comment";

export class FakeCommentRepository implements CommentRepository {
  private comments: Map<string, Comment> = new Map();

  async findById(id: CommentId): Promise<Comment | null> {
    const comment = this.comments.get(id.toString());
    return comment || null;
  }

  async findByBlogId(blogId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      comment => comment.getBlogId().toString() === blogId
    );
  }

  async findByUserId(userId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      comment => comment.getAuthorId().toString() === userId
    );
  }

  async save(comment: Comment): Promise<void> {
    this.comments.set(comment.getId().toString(), comment);
  }

  async delete(id: CommentId): Promise<void> {
    this.comments.delete(id.toString());
  }

  // Helper methods for testing
  clear(): void {
    this.comments.clear();
  }
} 