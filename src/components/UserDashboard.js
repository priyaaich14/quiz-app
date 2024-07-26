import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear user data from localStorage or context/state management
    localStorage.removeItem('userToken')// Example: Removing a user token
    localStorage.removeItem('userAnswers') // Removing stored answers if necessary

    // Navigate to the login page
    navigate('/')
  }

  const handleStartQuiz = () => {
    // Reset quiz state
    localStorage.removeItem('currentQuestionIndex')
    localStorage.removeItem('userAnswers')
    navigate('/quiz')
  }

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h2>User Dashboard</h2>
      <nav>
        <Link to="/user">Home</Link> |{' '}
        <Link to="/quiz" onClick={handleStartQuiz}>Start Quiz</Link> |{' '}
        <Link to="/score">Result</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  )
}
