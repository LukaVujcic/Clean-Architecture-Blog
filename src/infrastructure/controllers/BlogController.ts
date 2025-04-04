import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BlogService } from '../../application/interfaces/BlogService';
import { CreateBlogDto, UpdateBlogDto } from '../../application/dtos/BlogDto';
import 'reflect-metadata';

@injectable()
export class BlogController {
  constructor(
    @inject('BlogService') private blogService: BlogService
  ) {}

  /**
   * @swagger
   * /api/blogs:
   *   post:
   *     summary: Create a new blog post
   *     tags: [Blogs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBlogDto'
   *     responses:
   *       201:
   *         description: The blog was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseDto'
   */
  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const createBlogDto: CreateBlogDto = req.body;
      const blog = await this.blogService.createBlog(createBlogDto);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/blogs/{id}:
   *   get:
   *     summary: Get a blog by ID
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog ID
   *     responses:
   *       200:
   *         description: The blog details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseDto'
   *       404:
   *         description: The blog was not found
   */
  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const blog = await this.blogService.getBlogById(id);
      res.status(200).json(blog);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/blogs:
   *   get:
   *     summary: Get all blogs
   *     tags: [Blogs]
   *     responses:
   *       200:
   *         description: The list of blogs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/BlogResponseDto'
   */
  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await this.blogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/blogs/author/{authorId}:
   *   get:
   *     summary: Get all blogs by author
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: authorId
   *         schema:
   *           type: string
   *         required: true
   *         description: The author ID
   *     responses:
   *       200:
   *         description: The list of blogs by author
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/BlogResponseDto'
   */
  async getBlogsByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const authorId = req.params.authorId;
      const blogs = await this.blogService.getBlogsByAuthorId(authorId);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/blogs/{id}:
   *   put:
   *     summary: Update a blog
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBlogDto'
   *     responses:
   *       200:
   *         description: The blog was updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BlogResponseDto'
   *       404:
   *         description: The blog was not found
   */
  async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateBlogDto: UpdateBlogDto = req.body;
      const blog = await this.blogService.updateBlog(id, updateBlogDto);
      res.status(200).json(blog);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  /**
   * @swagger
   * /api/blogs/{id}:
   *   delete:
   *     summary: Delete a blog
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The blog ID
   *     responses:
   *       204:
   *         description: The blog was deleted
   *       404:
   *         description: The blog was not found
   */
  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.blogService.deleteBlog(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }
} 