import { Comment, CommentId } from "../../../../src/domain/entities/Comment";
import { BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("Comment entity", () => {
  it("should update content and updatedAt", () => {
    const comment = new Comment(
      new CommentId(randomUUID()),
      "content",
      new UserId(randomUUID()),
      new BlogId(randomUUID())
    );
    const oldUpdatedAt = comment.getUpdatedAt();

    comment.updateContent("new content");

    expect(comment.getContent()).toBe("new content");
    expect(comment.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(oldUpdatedAt.getTime());
  });

  it("CommentId equality and toString should work", () => {
    const value = randomUUID();
    const id1 = new CommentId(value);
    const id2 = new CommentId(value);
    const id3 = new CommentId(randomUUID());

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
    expect(id1.toString()).toBe(value);
  });
});
