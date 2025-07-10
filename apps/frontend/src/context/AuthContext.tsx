'use client';

// AuthContext.tsx
// Context provider for authentication state management
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/types/auth';
import { authApi, apiClient } from '@/lib/api';

// Initial auth state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

// Auth reducer for state management
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state and methods
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Login function
   * Authenticates user and stores token
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });

      // Call login API
      const response = await authApi.login(credentials);
      
      // Set token in API client
      apiClient.setToken(response.token);

      // Get user profile
      const profileResponse = await authApi.getProfile();

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: profileResponse.user,
          token: response.token,
        },
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw error;
    }
  };

  /**
   * Logout function
   * Clears authentication state and token
   */
  const logout = () => {
    apiClient.setToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  /**
   * Refresh authentication
   * Checks if stored token is still valid
   */
  const refreshAuth = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const token = apiClient.getToken();
      if (!token) {
        dispatch({ type: 'LOGIN_ERROR' });
        return;
      }

      // Verify token by getting user profile
      const profileResponse = await authApi.getProfile();

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: profileResponse.user,
          token,
        },
      });
    } catch {
      // Token is invalid, clear it
      logout();
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiClient.getToken();
        if (!token) {
          dispatch({ type: 'LOGIN_ERROR' });
          return;
        }

        // Verify token by getting user profile
        const profileResponse = await authApi.getProfile();

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: profileResponse.user,
            token,
          },
        });
      } catch {
        // Token is invalid, clear it
        logout();
      }
    };

    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
