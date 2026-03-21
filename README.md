# React User Management App with JWT Authentication

A React application for managing users with JWT-based authentication, built with Vite and integrated with JSON Server.

## Features

- **JWT Authentication**: Secure login system with token-based authentication
- **User Management**: Full CRUD operations (Create, Read, Update, Delete) for users
- **Protected Routes**: Route protection ensuring only authenticated users can access user management
- **Responsive UI**: Clean, styled interface for user interactions

## Tech Stack

- **Frontend**: React 19, React Router 7, Vite
- **Backend**: JSON Server with json-server-auth for authentication
- **Authentication**: JWT tokens with jwt-decode for client-side token handling

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd integrate_json_server_api
```

2. Install dependencies:
```bash
npm install
```

3. Install JSON Server with auth:
```bash
npm install -g json-server-auth
```

### Setup Database

The `db.json` file is already included in the project root with sample user data. It contains:

```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "password123",
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com",
      "phone": "1234567890"
    },
    {
      "id": 2,
      "username": "john",
      "password": "john123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "0987654321"
    }
  ]
}
```

### Running the Application

1. Start the backend (JSON Server):
```bash
npx json-server-auth db.json --port 3000
```

2. Start the frontend (React app):
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

4. Login with username: `admin`, password: `password123`

## Project Structure

```
src/
├── AuthContext.jsx      # Authentication context provider
├── Login.jsx           # Login form component
├── App.jsx             # Main app component with routing
├── UserList.jsx        # User listing with CRUD operations
├── UserAdd.jsx         # Add new user form
├── UserEdit.jsx        # Edit existing user form
├── App.css             # Main styles
└── main.jsx            # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

1. User visits the app and is redirected to `/login`
2. Enters credentials and submits the login form
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage and user is redirected to user list
5. All subsequent API requests include the JWT token in Authorization header
6. User can logout to clear the token and return to login

## API Endpoints

### Authentication
- `POST /login` - User authentication

### Users (Protected)
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Documentation

For detailed implementation details, see [JWT_Implementation.md](./JWT_Implementation.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
