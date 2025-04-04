"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const package_json_1 = require("../../../package.json");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API with Hexagonal Architecture',
            version: package_json_1.version,
            description: 'A RESTful API for a blog application using hexagonal architecture',
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                CreateUserDto: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'User\'s username',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email',
                        },
                        password: {
                            type: 'string',
                            description: 'User\'s password',
                        },
                    },
                    example: {
                        username: 'johndoe',
                        email: 'john.doe@example.com',
                        password: 'password123',
                    },
                },
                UpdateUserDto: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'User\'s username',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email',
                        },
                        password: {
                            type: 'string',
                            description: 'User\'s password',
                        },
                    },
                    example: {
                        username: 'johndoe_updated',
                        email: 'john.doe.updated@example.com',
                    },
                },
                UserResponseDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID',
                        },
                        username: {
                            type: 'string',
                            description: 'User\'s username',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email',
                        },
                    },
                    example: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        username: 'johndoe',
                        email: 'john.doe@example.com',
                    },
                },
                CreateBlogDto: {
                    type: 'object',
                    required: ['title', 'content', 'authorId'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Blog title',
                        },
                        content: {
                            type: 'string',
                            description: 'Blog content',
                        },
                        authorId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog author',
                        },
                    },
                    example: {
                        title: 'My first blog post',
                        content: 'This is the content of my first blog post.',
                        authorId: '123e4567-e89b-12d3-a456-426614174000',
                    },
                },
                UpdateBlogDto: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Blog title',
                        },
                        content: {
                            type: 'string',
                            description: 'Blog content',
                        },
                    },
                    example: {
                        title: 'Updated blog post title',
                        content: 'Updated content of the blog post.',
                    },
                },
                BlogResponseDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Blog ID',
                        },
                        title: {
                            type: 'string',
                            description: 'Blog title',
                        },
                        content: {
                            type: 'string',
                            description: 'Blog content',
                        },
                        authorId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog author',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation date and time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date and time',
                        },
                        likes: {
                            type: 'integer',
                            description: 'Number of likes',
                        },
                    },
                    example: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'My first blog post',
                        content: 'This is the content of my first blog post.',
                        authorId: '123e4567-e89b-12d3-a456-426614174000',
                        createdAt: '2023-06-15T12:00:00Z',
                        updatedAt: '2023-06-15T12:00:00Z',
                        likes: 0,
                    },
                },
                CreateCommentDto: {
                    type: 'object',
                    required: ['content', 'authorId', 'blogId'],
                    properties: {
                        content: {
                            type: 'string',
                            description: 'Comment content',
                        },
                        authorId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the comment author',
                        },
                        blogId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog post',
                        },
                    },
                    example: {
                        content: 'This is a comment on the blog post.',
                        authorId: '123e4567-e89b-12d3-a456-426614174000',
                        blogId: '123e4567-e89b-12d3-a456-426614174001',
                    },
                },
                UpdateCommentDto: {
                    type: 'object',
                    required: ['content'],
                    properties: {
                        content: {
                            type: 'string',
                            description: 'Comment content',
                        },
                    },
                    example: {
                        content: 'Updated comment content.',
                    },
                },
                CommentResponseDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Comment ID',
                        },
                        content: {
                            type: 'string',
                            description: 'Comment content',
                        },
                        authorId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the comment author',
                        },
                        blogId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog post',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation date and time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date and time',
                        },
                    },
                    example: {
                        id: '123e4567-e89b-12d3-a456-426614174002',
                        content: 'This is a comment on the blog post.',
                        authorId: '123e4567-e89b-12d3-a456-426614174000',
                        blogId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-06-15T12:30:00Z',
                        updatedAt: '2023-06-15T12:30:00Z',
                    },
                },
                CreateLikeDto: {
                    type: 'object',
                    required: ['userId', 'blogId'],
                    properties: {
                        userId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the user',
                        },
                        blogId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog post',
                        },
                    },
                    example: {
                        userId: '123e4567-e89b-12d3-a456-426614174000',
                        blogId: '123e4567-e89b-12d3-a456-426614174001',
                    },
                },
                LikeResponseDto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Like ID',
                        },
                        userId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the user',
                        },
                        blogId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the blog post',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation date and time',
                        },
                    },
                    example: {
                        id: '123e4567-e89b-12d3-a456-426614174003',
                        userId: '123e4567-e89b-12d3-a456-426614174000',
                        blogId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-06-15T12:45:00Z',
                    },
                },
            },
        },
    },
    apis: ['./src/infrastructure/controllers/*.ts', './src/infrastructure/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map