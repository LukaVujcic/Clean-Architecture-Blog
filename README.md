# Blog API - Hexagonal Architecture Example

This is a sample blog API built using Hexagonal Architecture (Ports and Adapters) pattern in TypeScript and Node.js.

## Architecture Overview

The application is structured following the Hexagonal Architecture (also known as Ports and Adapters) pattern:

- **Domain Layer** - Contains the business logic, entities, and ports (interfaces)
  - `entities/` - Core business objects
  - `ports/` - Interfaces for repositories (persistence)

- **Application Layer** - Orchestrates the domain objects
  - `interfaces/` - Contains service interfaces
  - `services/` - Implements use cases using domain objects
  - `dtos/` - Data Transfer Objects for external communication

- **Infrastructure Layer** - Contains adapters for external systems
  - `controllers/` - HTTP API controllers
  - `repositories/` - Database access implementations
  - `models/` - ORM models
  - `config/` - Configuration for external systems

## Technologies Used

- Node.js & TypeScript
- Express.js for API
- Sequelize as ORM
- InversifyJS for dependency injection
- PostgreSQL for production database
- SQLite for testing
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL (for development/production)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-hexagonal.git
cd blog-hexagonal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env` file based on the `.env.example`:
```bash
cp .env.example .env
```

### Database Setup

The application uses PostgreSQL by default for development and production, and SQLite for testing.

Edit the `.env` file to configure your database connection:
```
DB_NAME=blog
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### Running the Application

Development mode with hot reload:
```bash
npm run dev
```

Build and run in production mode:
```bash
npm run build
npm start
```

### API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## Testing

The project includes several types of tests:

### Unit Tests

Tests for domain and application services:
```bash
npm run test:unit
```

### Integration Tests

Tests for repositories and database interactions:
```bash
npm run test:integration
```

### End-to-End Tests

Tests for API endpoints:
```bash
npm run test:e2e
```

### Run All Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Continuous Integration

The project uses GitHub Actions for continuous integration. The CI pipeline includes:

1. **Building the project**: `npm run build`
2. **Running unit tests**: `npm run test:unit`
3. **Running integration tests**: `npm run test:integration`
4. **Running end-to-end tests**: `npm run test:e2e`
5. **Generating test coverage reports**: `npm run test:coverage`

### CI Environment

The CI pipeline uses:
- Node.js 18
- PostgreSQL 15 for database tests
- In-memory SQLite for lightweight tests

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server: `npm run dev`

## Available Scripts

- `npm run build` - Build the TypeScript project
- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm test` - Run all tests
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Generate test coverage reports

## Project Structure

This project follows the Hexagonal Architecture (also known as Ports and Adapters) pattern:

- `src/domain/` - Core business logic, entities, and interfaces
- `src/application/` - Use cases and application services
- `src/infrastructure/` - External adapters (controllers, repositories, etc.)
- `tests/` - Test files organized by test type 