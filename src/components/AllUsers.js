import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import usersData from '../data/users.json';

Chart.register(...registerables)

export default function AllUsers() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem('attempts')) || {}
    const userData = usersData
      .filter(user => user.role === 'user')
      .map(user => ({
        ...user,
        attempts: (attempts[user.username] || []).filter(attempt => !isNaN(attempt.score))  // Filter out NaN scores
      }))
    setUsers(userData)
  }, [])

  const getPieChartData = (user) => {
    const labels = user.attempts.map((_, index) => `Attempt ${index + 1}`)
    const scores = user.attempts.map(attempt => attempt.score)

    return {
      labels,
      datasets: [
        {
          label: `Scores for ${user.username}`,
          data: scores,
          backgroundColor: user.attempts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          borderColor: user.attempts.map(() => `rgba(255, 255, 255, 1)`),
          borderWidth: 1,
        }
      ]
    }
  }

  return (
    <div>
      <h2>All Users</h2>
      <button onClick={() => navigate('/admin')}>Back to Home</button>
      {users.map((user) => (
        <div key={user.id} className="user-container">
          <h3>{user.username} - Attempts: {user.attempts.length}</h3>
          <ul>
            {user.attempts.map((attempt, index) => (
              <li key={index}>
                Attempt {index + 1}: {new Date(attempt.date).toLocaleString()} - Score: {attempt.score}
              </li>
            ))}
          </ul>
          {user.attempts.length > 0 && (
            <div className="chart-container">
              <Pie
                data={getPieChartData(user)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: `Scores for ${user.username}`
                    }
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
