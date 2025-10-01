# KlaB Dashboard

A modern admin login dashboard built with React, TypeScript, and Vite. This application provides a clean and responsive login interface for administrative access.

## Features

- 🔐 Admin login form with email and password validation
- 📱 Responsive design that works on desktop and mobile
- 🎨 Modern UI with clean styling and hover effects
- ⚡ Fast development with Vite and Hot Module Replacement (HMR)
- 🛠️ TypeScript support for better development experience
- 📝 ESLint configuration for code quality

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Fast build tool and development server
- **CSS3** - Modern styling with flexbox and grid
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd "KlaB Dashboard"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component with LoginForm
├── App.css          # Component-specific styles
├── index.css        # Global styles and layout
├── main.tsx         # Application entry point
└── assets/          # Static assets
```

## Features Overview

### Login Form
- Email address input with validation
- Password input with secure field
- "Forgot password" link
- Responsive login button with hover effects

### Responsive Design
- Mobile-first approach
- Centered layout with card-style container
- Adaptive sizing for different screen sizes

## Development Features

This project uses Vite with the following plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- TypeScript support with strict type checking
- ESLint for code quality and consistency

## Customization

### Styling
- Modify `src/index.css` for global styles and layout
- Update `src/App.css` for component-specific styling
- Colors, fonts, and spacing can be easily customized

### Functionality
- Add form validation by implementing state management
- Connect to authentication API endpoints
- Add routing for post-login navigation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and TypeScript
