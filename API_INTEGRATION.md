# API Integration Guide

This document explains how to integrate the KlaB Dashboard with your backend API.

## Configuration

1. **Environment Variables**: Copy `.env.example` to `.env` and update the API URL:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

2. **API Configuration**: The API configuration is centralized in `src/config/api.ts`.

## Expected API Endpoints

Your backend should implement the following endpoints:

### 1. Login Endpoint
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin"
  },
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

### 2. Logout Endpoint
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

### 3. Token Validation Endpoint
**GET** `/api/auth/validate`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Token expired or invalid"
}
```

## Implementation Examples

### Node.js/Express Backend Example

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate user credentials (implement your own logic)
    const user = await validateUser(email, password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // Implement token blacklisting if needed
  res.json({ message: 'Logout successful' });
});

// Token validation endpoint
app.get('/api/auth/validate', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }
    req.user = user;
    next();
  });
}
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Token Expiration**: Implement reasonable token expiration times
3. **CORS**: Configure CORS properly for your domain
4. **Rate Limiting**: Implement rate limiting on auth endpoints
5. **Input Validation**: Validate all input data
6. **Password Security**: Use proper password hashing (bcrypt, etc.)

## Error Handling

The frontend handles these error scenarios:
- Network errors (connection issues)
- Authentication errors (401 Unauthorized)
- Server errors (500 Internal Server Error)
- Timeout errors (request takes too long)
- Invalid response format

## Development Mode

For development without a backend, you can:

1. Use the existing fake authentication (comment out real API calls)
2. Use a mock API service like JSON Server
3. Use API mocking tools like MSW (Mock Service Worker)

## Testing

Test your API integration:

1. **Valid Credentials**: Test with correct email/password
2. **Invalid Credentials**: Test with wrong email/password
3. **Network Issues**: Test with server down
4. **Token Expiration**: Test with expired tokens
5. **Malformed Responses**: Test with unexpected response formats

## Troubleshooting

Common issues and solutions:

1. **CORS Errors**: Configure CORS headers on your backend
2. **Network Errors**: Check if backend server is running
3. **401 Errors**: Verify token format and expiration
4. **Timeout Errors**: Check API response times
5. **Environment Variables**: Ensure `.env` file is properly configured