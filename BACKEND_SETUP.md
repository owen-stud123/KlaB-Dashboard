# Simple Backend Server for KlaB Dashboard

## Quick Setup

1. **Create backend directory:**
   ```bash
   mkdir klab-backend
   cd klab-backend
   ```

2. **Initialize Node.js project:**
   ```bash
   npm init -y
   npm install express cors jsonwebtoken bcryptjs dotenv
   npm install -D nodemon
   ```

3. **Create server.js:**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const jwt = require('jsonwebtoken');
   const bcrypt = require('bcryptjs');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 3001;
   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Demo user (in production, use a database)
   const users = [
     {
       id: '1',
       email: 'admin@klab.com',
       password: '$2a$10$8K1p/a1HNq93nBxD7AXl1OZLEVHWjz7qfk3.Kx1z8mK9Hq4K8mK9H', // password123
       name: 'Admin User',
       role: 'admin'
     }
   ];

   // Login endpoint
   app.post('/api/auth/login', async (req, res) => {
     try {
       const { email, password } = req.body;

       // Find user
       const user = users.find(u => u.email === email);
       if (!user) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }

       // Check password
       const isValidPassword = await bcrypt.compare(password, user.password);
       if (!isValidPassword) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }

       // Generate token
       const token = jwt.sign(
         { id: user.id, email: user.email },
         JWT_SECRET,
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
   app.post('/api/auth/logout', (req, res) => {
     res.json({ message: 'Logout successful' });
   });

   // Token validation endpoint
   app.get('/api/auth/validate', (req, res) => {
     const token = req.headers.authorization?.split(' ')[1];
     
     if (!token) {
       return res.status(401).json({ message: 'No token provided' });
     }

     try {
       const decoded = jwt.verify(token, JWT_SECRET);
       const user = users.find(u => u.id === decoded.id);
       
       if (!user) {
         return res.status(401).json({ message: 'User not found' });
       }

       res.json({
         user: {
           id: user.id,
           email: user.email,
           name: user.name,
           role: user.role
         }
       });
     } catch (error) {
       res.status(401).json({ message: 'Invalid token' });
     }
   });

   app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

4. **Create .env file:**
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3001
   ```

5. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

6. **Run the server:**
   ```bash
   npm run dev
   ```

## Test Credentials
- **Email**: admin@klab.com
- **Password**: password123