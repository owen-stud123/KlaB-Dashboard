import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApiUrl, getAuthHeaders, fetchWithTimeout } from '../../config/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  id?: string;
  name?: string;
  role?: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
};

// Async thunk for login (Demo Mode - replace with real API when backend is ready)
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay for realistic demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo authentication (replace with real API call when backend is ready)
      if (credentials.email === 'admin@klab.com' && credentials.password === 'password123') {
        const token = `demo-jwt-token-${Date.now()}`;
        const user = { 
          id: 'demo-user-123',
          email: credentials.email,
          name: 'Admin User',
          role: 'admin'
        };
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { token, user };
      } else {
        throw new Error('Invalid email or password');
      }

      /* 
      // Real API implementation :
      const response = await fetchWithTimeout(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.token || !data.user) {
        throw new Error('Invalid response format from server');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { 
        token: data.token, 
        user: data.user 
      };
      */
    } catch (error) {
      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return rejectWithValue('Network error. Please check your connection.');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

// Async thunk for logout with API call
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (token) {
        // Call logout API to invalidate token on server
        await fetchWithTimeout(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: getAuthHeaders(token),
        });
      }

      // Clear localStorage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return true;
    } catch (error) {
      // Even if logout API fails, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true; // Don't fail logout on API error
    }
  }
);

// Async thunk for token validation
export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error('No token found');
      }

      // Validate token with server
      const response = await fetchWithTimeout(getApiUrl('/api/auth/validate'), {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue('Token expired or invalid');
    }
  }
);

//-------------------------
// eliminating boilerplate
//-------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSync: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    // Set authentication state (useful for token refresh)
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
  },


  //--------------------------------
  //extraReducers handling
  //--------------------------------


  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;            //loading
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;      //success
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;     //error
        state.token = null;
        state.user = null;
      })
      // Logout cases
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;                 
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
        // Still logout locally even if API fails
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      // Token validation cases
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logoutSync, clearError, setAuth } = authSlice.actions;
export default authSlice.reducer;
