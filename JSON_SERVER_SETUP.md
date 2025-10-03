# Quick Mock API with JSON Server

## Setup JSON Server for Testing

1. **Install JSON Server:**
   ```bash
   npm install -g json-server
   ```

2. **Create db.json:**
   ```json
   {
     "users": [
       {
         "id": 1,
         "email": "admin@klab.com",
         "password": "password123",
         "name": "Admin User",
         "role": "admin"
       }
     ],
     "tokens": []
   }
   ```

3. **Create routes.json:**
   ```json
   {
     "/api/auth/login": "/login",
     "/api/auth/logout": "/logout",
     "/api/auth/validate": "/validate"
   }
   ```

4. **Start JSON Server:**
   ```bash
   json-server --watch db.json --routes routes.json --port 3001
   ```

**Note**: JSON Server is limited for authentication but good for testing basic API structure.