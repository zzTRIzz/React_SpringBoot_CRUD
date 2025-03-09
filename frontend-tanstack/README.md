# User Management System with TanStack Router

This project is a modern React application built with TypeScript, TanStack Router, and Bootstrap for managing users. It demonstrates CRUD operations with a Spring Boot backend.

## Features

- List all users with pagination
- View user details
- Add new users
- Edit existing users
- Delete users
- Form validation using Zod
- Type-safe routing with TanStack Router
- Modern UI with Bootstrap 5

## Tech Stack

- React 18
- TypeScript
- TanStack Router for routing
- React Hook Form for form handling
- Zod for schema validation
- Bootstrap 5 for styling
- Axios for API calls
- Vite for build tooling

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
  ├── lib/
  │   └── axios.ts         # Axios instance configuration
  ├── routes/
  │   ├── __root.tsx       # Root route configuration
  │   ├── index.tsx        # Home page (user list)
  │   ├── users.add.tsx    # Add user form
  │   ├── users.$id.view.tsx # View user details
  │   └── users.$id.edit.tsx # Edit user form
  ├── types/
  │   └── user.ts          # TypeScript interfaces
  ├── App.tsx              # Main application component
  ├── main.tsx            # Application entry point
  └── routeTree.gen.ts    # Generated route tree
```

## API Endpoints

The application expects the following API endpoints:

- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `POST /add` - Create new user
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

## Development

This project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vite for fast development and building

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
