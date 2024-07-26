import { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true  // Indicates whether the authentication state is being loaded
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
    dispatch({ type: 'SET_LOADING', payload: false }) // Ensure to set loading to false after checking
  }, [])

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'LOGIN', payload: user })
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
