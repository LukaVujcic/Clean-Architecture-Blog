import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../../src/app';
import sequelize from '../../../src/infrastructure/config/database';
import UserModel from '../../../src/infrastructure/models/UserModel';
import BlogModel from '../../../src/infrastructure/models/BlogModel';

describe('Blog API', () => {
  let testUserId: string;

  beforeAll(async () => {
    // Connect to database and sync models
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Create a test user that we'll use as the author for blog tests
    const userData = {
      id: uuidv4(),
      username: 'blogauthor',
      email: 'blogauthor@example.com',
      password: 'password123'
    };
    await UserModel.create(userData);
    testUserId = userData.id;
  });

  beforeEach(async () => {
    // Clear blogs table before each test
    await BlogModel.destroy({ where: {} });
  });

  afterAll(async () => {
    // Clean up test data and close connection
    await UserModel.destroy({ where: {} });
    await sequelize.close();
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog post', async () => {
      const blogData = {
        title: 'Test Blog',
        content: 'This is a test blog post content',
        authorId: testUserId
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(blogData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(blogData.title);
      expect(response.body.content).toBe(blogData.content);
      expect(response.body.authorId).toBe(testUserId);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('likes', 0);

      // Verify blog was saved to database
      const blogInDb = await BlogModel.findByPk(response.body.id);
      expect(blogInDb).not.toBeNull();
      expect(blogInDb?.title).toBe(blogData.title);
      expect(blogInDb?.content).toBe(blogData.content);
    });

    it('should return 400 if authorId does not exist', async () => {
      const blogData = {
        title: 'Test Blog',
        content: 'This is a test blog post content',
        authorId: uuidv4() // Random non-existent user ID
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(blogData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Author not found');
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should return a blog post by ID', async () => {
      // Create a blog post first
      const blogId = uuidv4();
      const blogData = {
        id: blogId,
        title: 'Test Blog',
        content: 'This is a test blog post content',
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      await BlogModel.create(blogData);

      // Retrieve the blog post
      const response = await request(app)
        .get(`/api/blogs/${blogId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', blogId);
      expect(response.body.title).toBe(blogData.title);
      expect(response.body.content).toBe(blogData.content);
      expect(response.body.authorId).toBe(testUserId);
    });

    it('should return 404 for non-existent blog post', async () => {
      const nonExistentId = uuidv4();
      
      const response = await request(app)
        .get(`/api/blogs/${nonExistentId}`);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Blog not found');
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update a blog post', async () => {
      // Create a blog post first
      const blogId = uuidv4();
      const blogData = {
        id: blogId,
        title: 'Original Title',
        content: 'Original Content',
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      await BlogModel.create(blogData);

      // Update the blog post
      const updateData = {
        title: 'Updated Title',
        content: 'Updated Content'
      };

      const response = await request(app)
        .put(`/api/blogs/${blogId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', blogId);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.content).toBe(updateData.content);
      expect(response.body.authorId).toBe(testUserId);

      // Verify blog was updated in database
      const blogInDb = await BlogModel.findByPk(blogId);
      expect(blogInDb).not.toBeNull();
      expect(blogInDb?.title).toBe(updateData.title);
      expect(blogInDb?.content).toBe(updateData.content);
    });
    
    it('should return 404 for non-existent blog post', async () => {
      const nonExistentId = uuidv4();
      const updateData = {
        title: 'Updated Title'
      };
      
      const response = await request(app)
        .put(`/api/blogs/${nonExistentId}`)
        .send(updateData);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Blog not found');
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete a blog post', async () => {
      // Create a blog post first
      const blogId = uuidv4();
      const blogData = {
        id: blogId,
        title: 'Test Blog',
        content: 'This is a test blog post content',
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      await BlogModel.create(blogData);

      // Delete the blog post
      const response = await request(app)
        .delete(`/api/blogs/${blogId}`);

      expect(response.status).toBe(204);

      // Verify blog was deleted from database
      const blogInDb = await BlogModel.findByPk(blogId);
      expect(blogInDb).toBeNull();
    });
    
    it('should return 404 for non-existent blog post', async () => {
      const nonExistentId = uuidv4();
      
      const response = await request(app)
        .delete(`/api/blogs/${nonExistentId}`);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Blog not found');
    });
  });
  
  describe('GET /api/blogs/author/:authorId', () => {
    it('should return all blog posts by author', async () => {
      // Create multiple blog posts by test user
      const blog1Data = {
        id: uuidv4(),
        title: 'Blog 1',
        content: 'Content 1',
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      
      const blog2Data = {
        id: uuidv4(),
        title: 'Blog 2',
        content: 'Content 2',
        authorId: testUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      
      // Create a blog post by another user
      const otherUserId = uuidv4();
      await UserModel.create({
        id: otherUserId,
        username: 'otheruser',
        email: 'other@example.com',
        password: 'password123'
      });
      
      const blog3Data = {
        id: uuidv4(),
        title: 'Blog 3',
        content: 'Content 3',
        authorId: otherUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      
      await BlogModel.create(blog1Data);
      await BlogModel.create(blog2Data);
      await BlogModel.create(blog3Data);
      
      // Get blogs by test user
      const response = await request(app)
        .get(`/api/blogs/author/${testUserId}`);
        
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].authorId).toBe(testUserId);
      expect(response.body[1].authorId).toBe(testUserId);
    });
    
    it('should return empty array if author has no blogs', async () => {
      // Create a user with no blogs
      const emptyUserId = uuidv4();
      await UserModel.create({
        id: emptyUserId,
        username: 'emptyuser',
        email: 'empty@example.com',
        password: 'password123'
      });
      
      const response = await request(app)
        .get(`/api/blogs/author/${emptyUserId}`);
        
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });
}); 