# Blog Application with Clean Architecture

A Node.js blog application built with TypeScript following Clean Architecture principles.

## Project Overview

This project demonstrates a clean architecture approach to building a blog platform, separating business logic from infrastructure concerns through the use of Clean Architecture principles.

## Features

- User management
- Blog post creation and management
- RESTful API with Express
- Swagger documentation
- Clean Architecture implementation
- Comprehensive testing strategy

## Technology Stack

- **Node.js & TypeScript**: Core platform
- **Express**: Web framework
- **InversifyJS**: Dependency injection
- **Sequelize**: ORM for database interactions
- **PostgreSQL**: Production database
- **SQLite**: Development/Test database
- **Jest**: Testing framework
- **Swagger**: API documentation
- **GitHub Actions**: CI/CD pipeline

## Architecture Overview

The application is structured following Clean Architecture principles, which consists of four main layers:

### 1. Domain Layer (Enterprise Business Rules)
- `entities/` - Core business objects and enterprise-wide business rules
- `value-objects/` - Immutable objects that describe aspects of the domain
- `ports/` - Interface definitions for external dependencies
  - `repositories/` - Repository interfaces
  - `services/` - Service interfaces for external services

### 2. Application Layer (Application Business Rules)
- `use-cases/` - Implementation of application-specific business rules
- `interfaces/` - Interface definitions for use cases
- `dtos/` - Data Transfer Objects for input/output
- `mappers/` - Transforms data between layers
- `services/` - Application services that orchestrate use cases

### 3. Interface Adapters Layer
- `controllers/` - HTTP API controllers
- `presenters/` - Data presenters for API responses
- `middleware/` - Express middleware
- `routes/` - API route definitions
- `validators/` - Request validation logic

### 4. Infrastructure Layer
- `persistence/` - Database implementations
  - `repositories/` - Repository implementations
  - `models/` - ORM models
- `config/` - Configuration for external systems
- `logging/` - Logging implementations
- `security/` - Security implementations
- `messaging/` - Message queue implementations

### Key Principles
- Dependencies point inward
- Inner layers have no knowledge of outer layers
- Domain layer is independent of any framework
- Use cases orchestrate the flow of data to and from entities
- Interface adapters convert data between the format most convenient for entities and use cases
- Infrastructure concerns are kept in the outermost layer

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL (for development/production)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-clean-architecture.git
cd blog-clean-architecture
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

## Project Structure

```
src/
├── domain/                 # Enterprise business rules
│   ├── entities/          # Business objects
│   ├── value-objects/     # Immutable domain objects
│   ├── ports/             # Interface definitions
│   │   ├── repositories/  # Repository interfaces
│   │   └── services/      # Service interfaces
│   └── repositories/      # Repository interfaces (legacy)
│
├── application/           # Application business rules
│   ├── use-cases/        # Use case implementations
│   ├── interfaces/       # Use case interfaces
│   ├── dtos/            # Data Transfer Objects
│   ├── mappers/         # Data transformers
│   └── services/        # Application services
│
├── interface-adapters/   # Interface adapters
│   ├── controllers/     # HTTP controllers
│   ├── presenters/      # Response presenters
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   └── validators/      # Request validators
│
└── infrastructure/      # Frameworks and drivers
    ├── config/         # Configuration
    ├── controllers/    # Legacy controllers (to be moved)
    ├── models/         # Legacy models (to be moved)
    ├── repositories/   # Legacy repositories (to be moved)
    ├── persistence/    # Database implementations
    │   ├── models/     # ORM models
    │   └── repositories/ # Repository implementations
    ├── logging/        # Logging implementations
    ├── security/       # Security implementations
    └── messaging/      # Message queue implementations

tests/
├── unit/               # Unit tests
├── integration/        # Integration tests
└── e2e/               # End-to-end tests
```

Note: Some directories in the infrastructure layer (controllers, models, repositories) are marked as legacy and should be moved to their proper locations according to Clean Architecture principles:
- Controllers should be moved to interface-adapters/controllers
- Models and repositories should be moved to infrastructure/persistence

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
