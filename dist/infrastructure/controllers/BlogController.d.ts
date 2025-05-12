import { Request, Response } from 'express';
import { CreateBlogUseCase } from '../../application/use-cases/blog/CreateBlogUseCase';
import { GetBlogUseCase } from '../../application/use-cases/blog/GetBlogUseCase';
import { UpdateBlogUseCase } from '../../application/use-cases/blog/UpdateBlogUseCase';
import { DeleteBlogUseCase } from '../../application/use-cases/blog/DeleteBlogUseCase';
import 'reflect-metadata';
export declare class BlogController {
    private createBlogUseCase;
    private getBlogUseCase;
    private updateBlogUseCase;
    private deleteBlogUseCase;
    constructor(createBlogUseCase: CreateBlogUseCase, getBlogUseCase: GetBlogUseCase, updateBlogUseCase: UpdateBlogUseCase, deleteBlogUseCase: DeleteBlogUseCase);
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
    createBlog(req: Request, res: Response): Promise<void>;
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
    getBlogById(req: Request, res: Response): Promise<void>;
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
    getAllBlogs(req: Request, res: Response): Promise<void>;
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
    getBlogsByAuthor(req: Request, res: Response): Promise<void>;
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
    updateBlog(req: Request, res: Response): Promise<void>;
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
    deleteBlog(req: Request, res: Response): Promise<void>;
}
