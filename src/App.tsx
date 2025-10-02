import React, { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { loginAsync, logoutAsync, clearError } from './features/auth/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, error, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{email?: string; password?: string}>({});

  useEffect(() => {
    // Clear form when user logs out
    if (!isAuthenticated) {
      setEmail('');
      setPassword('');
      setFormErrors({});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginAsync({ email, password }));
    }
  };

  if (isAuthenticated) {
    return (
      <div className="app">
        <h1>KLab Dashboard</h1>
        <p>Welcome back, {user?.email}!</p>
        <p>You are successfully logged in.</p>
        <button 
          onClick={() => dispatch(logoutAsync())}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>KLab</h1>
      <div className="input-wrapper">
        <h2>Admin Login</h2>
        <p className="demo-credentials">
          Demo: admin@klab.com / password123
        </p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formErrors.email) {
                setFormErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
            className={formErrors.email ? 'error' : ''}
            disabled={isLoading}
          />
          {formErrors.email && (
            <span className="field-error">{formErrors.email}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) {
                setFormErrors(prev => ({ ...prev, password: undefined }));
              }
            }}
            className={formErrors.password ? 'error' : ''}
            disabled={isLoading}
          />
          {formErrors.password && (
            <span className="field-error">{formErrors.password}</span>
          )}
        </div>
        
        <button 
          type="button" 
          className="forgot-password"
          onClick={() => alert('Password reset functionality not implemented yet')}
        >
          Forgot password?
        </button>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
};

export default App;
