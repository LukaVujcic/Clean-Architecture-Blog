"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
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
    async createBlog(req, res) {
        try {
            const createBlogDto = req.body;
            const blog = await this.blogService.createBlog(createBlogDto);
            res.status(201).json(blog);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
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
    async getBlogById(req, res) {
        try {
            const id = req.params.id;
            const blog = await this.blogService.getBlogById(id);
            res.status(200).json(blog);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
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
    async getAllBlogs(req, res) {
        try {
            const blogs = await this.blogService.getAllBlogs();
            res.status(200).json(blogs);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
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
    async getBlogsByAuthor(req, res) {
        try {
            const authorId = req.params.authorId;
            const blogs = await this.blogService.getBlogsByAuthorId(authorId);
            res.status(200).json(blogs);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
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
    async updateBlog(req, res) {
        try {
            const id = req.params.id;
            const updateBlogDto = req.body;
            const blog = await this.blogService.updateBlog(id, updateBlogDto);
            res.status(200).json(blog);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
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
    async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            await this.blogService.deleteBlog(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};
exports.BlogController = BlogController;
exports.BlogController = BlogController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('BlogService')),
    __metadata("design:paramtypes", [Object])
], BlogController);
//# sourceMappingURL=BlogController.js.map