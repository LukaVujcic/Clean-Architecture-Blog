import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../../src/app';
import sequelize from '../../../src/infrastructure/config/database';
import UserModel from '../../../src/infrastructure/models/UserModel';

describe('User API', () => {
  beforeAll(async () => {
    // Connect to database and sync models
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    // Clear users table before each test
    await UserModel.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');

      // Verify user was saved to database
      const userInDb = await UserModel.findByPk(response.body.id);
      expect(userInDb).not.toBeNull();
      expect(userInDb?.username).toBe(userData.username);
      expect(userInDb?.email).toBe(userData.email);
    });

    it('should return 400 if email already exists', async () => {
      // Create a user first
      const existingUser = {
        id: uuidv4(),
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123'
      };
      await UserModel.create(existingUser);

      // Try to create another user with the same email
      const userData = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('email already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      // Create a user first
      const userId = uuidv4();
      const userData = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      await UserModel.create(userData);

      // Retrieve the user
      const response = await request(app)
        .get(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = uuidv4();
      
      const response = await request(app)
        .get(`/api/users/${nonExistentId}`);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      // Create a user first
      const userId = uuidv4();
      const userData = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      await UserModel.create(userData);

      // Update the user
      const updateData = {
        username: 'updateduser',
        email: 'updated@example.com'
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body.username).toBe(updateData.username);
      expect(response.body.email).toBe(updateData.email);

      // Verify user was updated in database
      const userInDb = await UserModel.findByPk(userId);
      expect(userInDb).not.toBeNull();
      expect(userInDb?.username).toBe(updateData.username);
      expect(userInDb?.email).toBe(updateData.email);
    });
    
    it('should return 404 for non-existent user', async () => {
      const nonExistentId = uuidv4();
      const updateData = {
        username: 'updateduser'
      };
      
      const response = await request(app)
        .put(`/api/users/${nonExistentId}`)
        .send(updateData);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      // Create a user first
      const userId = uuidv4();
      const userData = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      await UserModel.create(userData);

      // Delete the user
      const response = await request(app)
        .delete(`/api/users/${userId}`);

      expect(response.status).toBe(204);

      // Verify user was deleted from database
      const userInDb = await UserModel.findByPk(userId);
      expect(userInDb).toBeNull();
    });
    
    it('should return 404 for non-existent user', async () => {
      const nonExistentId = uuidv4();
      
      const response = await request(app)
        .delete(`/api/users/${nonExistentId}`);
        
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('User not found');
    });
  });
}); 