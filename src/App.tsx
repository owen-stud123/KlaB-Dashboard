import React from 'react';
import './App.css';

const LoginForm = () => {
  return (
    <div className="app">
      <h1>KLab</h1>
      <div className="input-wrapper">
        <h2>Admin Login</h2>
    </div>
 
      <form>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <a href="/404.html" className="forgot-password">Forgot password?</a>
        <button type="submit" className="login-button">Log in</button>
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