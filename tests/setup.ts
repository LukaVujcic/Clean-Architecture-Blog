import dotenv from 'dotenv';

// Load environment variables from .env.test file
dotenv.config({ path: '.env.test' });

// Set timeout for tests
const testTimeout = process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT) : 30000;
// 30 seconds by default
if (typeof jest !== 'undefined') {
  jest.setTimeout(testTimeout);
}

// Add global types for TypeScript/Jest
declare global {
  namespace NodeJS {
    interface Global {
      expect: jest.Expect;
    }
  }
}

// Add global types for TypeScript/Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
} 