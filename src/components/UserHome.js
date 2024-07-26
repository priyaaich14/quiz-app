
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UserHome() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    // Sync user context with local storage or initialize it
    const storedUsername = localStorage.getItem('username')
    if (storedUsername && (!user || !user.username)) {
      // Set user context if it's not already set correctly
      setUser({ ...user, username: storedUsername })
    }
  }, [user, setUser])

  const handleLogout = () => {
    // Clear user-specific data from localStorage
    localStorage.removeItem('userToken') // Remove the user token
    localStorage.removeItem('userAnswers') // Remove user's answers

    if (setUser) {
      setUser({}) // Reset user context
    }

    // Navigate to the login page
    navigate('/login')
  }

  const handleStartQuiz = () => {
    // Reset quiz state
    localStorage.removeItem('currentQuestionIndex')
    localStorage.removeItem('userAnswers')
    navigate('/quiz')
  }

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h2>Welcome, {user && user.username ? user.username : 'User'}!!!</h2>
      <nav>
        <Link to="/quiz" onClick={handleStartQuiz}>Start Quiz</Link> | 
        <Link to="/score">View Results</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  )
}
