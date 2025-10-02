# KlaB Dashboard

A production-ready admin login dashboard built with React, TypeScript, Redux Toolkit, and Vite. This application provides a comprehensive authentication system with real API integration, JWT token management, and a modern, responsive interface for administrative access.

## 🚀 Features

### 🔐 **Enterprise Authentication System**
- **Real API Integration** with configurable backend endpoints
- **JWT Token Management** with secure storage and validation
- **Token Expiration Handling** with automatic cleanup
- **Server-side Logout** to invalidate tokens properly
- **Network Error Handling** with retry mechanisms
- **Request Timeout Protection** (10-second timeout)

### ✅ **Advanced Form Features**
- **Real-time Validation** with instant feedback
- **Email Format Validation** with regex patterns
- **Password Strength Requirements** (minimum 6 characters)
- **Loading States** with disabled inputs during API calls
- **Error Recovery** with automatic error clearing

### 🎨 **Modern UI/UX**
- **Responsive Design** optimized for all devices
- **Smooth Animations** with CSS transitions and keyframes
- **Interactive Elements** with hover effects and transforms
- **Error Animations** with shake effects for validation feedback
- **Professional Styling** with modern color schemes

### ⚡ **Performance & Development**
- **Fast Development** with Vite and Hot Module Replacement
- **TypeScript Support** with strict type checking
- **Environment Configuration** with `.env` support
- **API Configuration** with centralized endpoint management
- **ESLint Integration** for code quality

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features and concurrent rendering
- **TypeScript** - Type-safe JavaScript with strict type checking
- **Redux Toolkit** - Modern Redux with RTK Query and async thunks
- **React Redux** - Official React bindings for Redux
- **Vite 7** - Lightning-fast build tool and development server
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **ESLint** - Code linting and formatting rules

## 🔧 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Backend API** (see [API Integration Guide](./API_INTEGRATION.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "KlaB Dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5177` (or another port if 5173-5176 are in use)

### Build & Deploy

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── features/
│   └── auth/
│       └── authSlice.ts         # Redux authentication slice with async thunks
├── store/
│   └── index.ts                 # Redux store configuration
├── config/
│   └── api.ts                   # API configuration and helper functions
├── App.tsx                      # Main application component
├── App.css                      # Component styles with animations
├── index.css                    # Global styles and layout
├── main.tsx                     # App entry point with Redux Provider
└── assets/                      # Static assets

Root Files:
├── .env.example                 # Environment configuration template
├── API_INTEGRATION.md           # Complete API integration guide
└── README.md                    # This file
```

## 🔐 Authentication System

### API Integration
The dashboard integrates with your backend through REST APIs:

- **POST** `/api/auth/login` - User authentication
- **POST** `/api/auth/logout` - Server-side logout
- **GET** `/api/auth/validate` - Token validation

### Security Features
- **JWT Token Storage** with localStorage
- **Token Validation** on app initialization
- **Automatic Token Cleanup** on logout/expiration
- **Network Error Recovery** with proper error messages
- **Request Timeout Protection** to prevent hanging requests

### State Management
- **Redux Toolkit** for predictable state updates
- **Async Thunks** for API call management
- **Loading States** for better user experience
- **Error Handling** with proper error states

## 🎯 Usage

### For Development
1. **Configure API endpoints** in `src/config/api.ts`
2. **Set environment variables** in `.env`
3. **Implement backend endpoints** (see [API Integration Guide](./API_INTEGRATION.md))
4. **Test authentication flow** with your API

### For Production
1. **Build the application** with `npm run build`
2. **Deploy static files** to your web server
3. **Configure environment variables** for production API
4. **Set up HTTPS** and proper CORS headers

## 🔧 Configuration

### Environment Variables
```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3001

# Example for different environments:
# Development: http://localhost:3001
# Staging: https://api-staging.yourapp.com  
# Production: https://api.yourapp.com
```

### API Configuration
Customize API settings in `src/config/api.ts`:
- Base URL and endpoints
- Request timeout duration
- Default headers
- Error handling behavior

## 🔗 Backend Integration

Your backend must implement these endpoints with proper responses:

### Login Endpoint
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin"
  }
}
```

See the complete [API Integration Guide](./API_INTEGRATION.md) for detailed implementation examples.

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-first approach** with breakpoints
- **Flexible layouts** using CSS Grid and Flexbox
- **Touch-friendly interface** for mobile devices

### Interactive Elements
- **Hover effects** on buttons and form elements
- **Loading states** with visual feedback
- **Error animations** with shake effects
- **Smooth transitions** for state changes

### Accessibility
- **Semantic HTML** for screen readers
- **Keyboard navigation** support
- **ARIA labels** for form elements
- **High contrast** design elements

## 🧪 Testing

### Manual Testing
1. **Valid login** with correct credentials
2. **Invalid login** with wrong credentials
3. **Network errors** (disconnect internet)
4. **Token expiration** scenarios
5. **Form validation** edge cases

### Automated Testing (Future)
- Unit tests for Redux slices
- Integration tests for API calls
- E2E tests for authentication flow

## 🚀 Performance

### Optimization Features
- **Code splitting** with dynamic imports
- **Tree shaking** to eliminate dead code
- **Asset optimization** with Vite
- **Development hot reload** for fast iteration

### Best Practices
- **TypeScript strict mode** for type safety
- **ESLint rules** for code consistency
- **Proper error boundaries** for error handling
- **Optimized re-renders** with React best practices

## 🛠️ Development Tools

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

### IDE Configuration
- **VS Code** settings for optimal development
- **TypeScript** IntelliSense support
- **ESLint** integration for real-time feedback
- **Prettier** formatting (optional)

## 🔧 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `.env` configuration
   - Verify backend server is running
   - Check CORS headers on backend

2. **Build Errors**
   - Run `npm install` to update dependencies
   - Check TypeScript errors in console
   - Verify all imports are correct

3. **Authentication Issues**
   - Check API endpoint responses
   - Verify JWT token format
   - Test with API tools (Postman, etc.)

See [API Integration Guide](./API_INTEGRATION.md) for detailed troubleshooting steps.

## 📚 Documentation

- **[API Integration Guide](./API_INTEGRATION.md)** - Complete backend integration
- **[TypeScript Guide](https://www.typescriptlang.org/docs/)** - TypeScript documentation
- **[Redux Toolkit Guide](https://redux-toolkit.js.org/)** - State management patterns
- **[Vite Guide](https://vitejs.dev/guide/)** - Build tool configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run linting** and fix any issues
6. **Submit a pull request**

### Development Guidelines
- Follow existing code style and patterns
- Add TypeScript types for all new code
- Update documentation for new features
- Test authentication flows thoroughly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Redux Team** for Redux Toolkit
- **Vite Team** for the lightning-fast build tool
- **TypeScript Team** for type safety

---

**Built using React, TypeScript, and Redux Toolkit**

> 🚀 Ready for production use with enterprise-grade authentication and modern development practices.
