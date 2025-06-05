import { Like, LikeId } from "../../../../src/domain/entities/Like";
import { BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("Like entity", () => {
  it("should expose user and blog ids", () => {
    const userId = new UserId(randomUUID());
    const blogId = new BlogId(randomUUID());
    const like = new Like(new LikeId(randomUUID()), userId, blogId);

    expect(like.getUserId()).toBe(userId);
    expect(like.getBlogId()).toBe(blogId);
  });

  it("LikeId equality and toString should work", () => {
    const value = randomUUID();
    const id1 = new LikeId(value);
    const id2 = new LikeId(value);
    const id3 = new LikeId(randomUUID());

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
    expect(id1.toString()).toBe(value);
  });
});
