# JWT Authentication Implementation

This document describes the JWT (JSON Web Token) authentication implementation added to the React user management application.

## Overview

The application now includes a complete authentication system using JWT tokens. Users must log in to access the user management features (list, add, edit users). The system integrates with a JSON Server backend enhanced with authentication middleware.

## Architecture

### Components

1. **AuthContext.jsx**
   - Provides authentication state management across the app
   - Stores JWT token in localStorage
   - Handles login, logout, and token validation
   - Decodes JWT tokens to extract user information

2. **Login.jsx**
   - Login form component
   - Validates user credentials
   - Communicates with `/login` endpoint
   - Stores token on successful authentication

3. **App.jsx**
   - Main application component
   - Wraps app with AuthProvider
   - Implements route protection with ProtectedRoute
   - Shows navigation menu only when authenticated

4. **UserList.jsx, UserAdd.jsx, UserEdit.jsx**
   - Include Authorization headers in API requests
   - Use JWT token for authenticated CRUD operations

### Authentication Flow

1. **Login Process**:
   - User enters username/password in Login form
   - POST request to `http://localhost:3000/login`
   - On success: JWT token stored in localStorage
   - User redirected to user list

2. **Protected Routes**:
   - Unauthenticated users redirected to `/login`
   - Authenticated users can access user management pages

3. **API Requests**:
   - All CRUD operations include `Authorization: Bearer <token>` header
   - Token validated by backend on each request

4. **Logout**:
   - Clears token from localStorage
   - Resets authentication state
   - Redirects to login page

## Backend Setup

### Prerequisites

Install JSON Server with authentication support:

```bash
npm install -g json-server-auth
```

### Database Configuration

Create `db.json` in the project root:

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
    }
  ]
}
```

### Running the Backend

```bash
npx json-server-auth db.json --port 3000
```

This starts JSON Server with authentication endpoints:
- `POST /login` - Authenticate user
- `POST /register` - Register new user (optional)
- Protected routes require Authorization header

## Frontend Setup

### Dependencies

The following package is required:

```bash
npm install jwt-decode
```

### Running the Application

1. Start the backend (as above)
2. Start the React app:

```bash
npm run dev
```

3. Open `http://localhost:5173` (or your dev server URL)
4. You'll be redirected to `/login`
5. Use credentials from `db.json` to log in

## API Endpoints

### Authentication
- `POST /login` - Login with username/password
  - Body: `{ "username": "admin", "password": "password123" }`
  - Response: `{ "accessToken": "jwt.token.here" }`

### User Management (Protected)
- `GET /users` - List all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

## Security Considerations

1. **Token Storage**: JWT stored in localStorage (consider httpOnly cookies for production)
2. **Token Expiry**: Implement token refresh logic for long sessions
3. **HTTPS**: Use HTTPS in production to prevent token interception
4. **Password Security**: Hash passwords on backend (JSON Server stores plain text for demo)
5. **CORS**: Configure CORS properly for cross-origin requests

## Code Structure

```
src/
├── AuthContext.jsx      # Authentication context and provider
├── Login.jsx           # Login form component
├── App.jsx             # Main app with routing and protection
├── UserList.jsx        # User list with auth headers
├── UserAdd.jsx         # Add user with auth headers
├── UserEdit.jsx        # Edit user with auth headers
└── ...
```

## Testing

1. Start backend and frontend
2. Try accessing `/` without login - should redirect to `/login`
3. Login with valid credentials - should access user management
4. Logout - should clear session and redirect to login
5. Try API calls without token - should fail with 401 Unauthorized

## Future Enhancements

- Token refresh mechanism
- Role-based access control
- Password reset functionality
- Social login integration
- Two-factor authentication