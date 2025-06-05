import { Blog, BlogId } from "../../../../src/domain/entities/Blog";
import { UserId } from "../../../../src/domain/entities/User";
import { randomUUID } from "crypto";

describe("Blog entity", () => {
  it("should update title and updatedAt", () => {
    const blog = new Blog(new BlogId(randomUUID()), "Title", "Content", new UserId(randomUUID()));
    const oldUpdatedAt = blog.getUpdatedAt();

    blog.updateTitle("New Title");

    expect(blog.getTitle()).toBe("New Title");
    expect(blog.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(oldUpdatedAt.getTime());
  });

  it("should update content and updatedAt", () => {
    const blog = new Blog(new BlogId(randomUUID()), "Title", "Content", new UserId(randomUUID()));
    const oldUpdatedAt = blog.getUpdatedAt();

    blog.updateContent("New Content");

    expect(blog.getContent()).toBe("New Content");
    expect(blog.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(oldUpdatedAt.getTime());
  });

  it("should increment and decrement likes without going below zero", () => {
    const blog = new Blog(new BlogId(randomUUID()), "Title", "Content", new UserId(randomUUID()), new Date(), new Date(), 0);

    blog.incrementLikes();
    expect(blog.getLikes()).toBe(1);

    blog.decrementLikes();
    expect(blog.getLikes()).toBe(0);

    blog.decrementLikes();
    expect(blog.getLikes()).toBe(0);
  });

  it("BlogId equality and toString should work", () => {
    const value = randomUUID();
    const id1 = new BlogId(value);
    const id2 = new BlogId(value);
    const id3 = new BlogId(randomUUID());

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
    expect(id1.toString()).toBe(value);
  });
});
