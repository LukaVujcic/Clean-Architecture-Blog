import 'reflect-metadata';
import dotenv from 'dotenv';
import sequelize from './infrastructure/config/database';
import { app } from './app';

dotenv.config();

const port = process.env.PORT || 3000;

// Database connection and server startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models with database (for development)
    // In production, use migrations instead
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer(); 