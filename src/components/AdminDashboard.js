import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserStatistics from './UserStatistics';  // Assuming you have this component

export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear specific admin-related session data
    localStorage.removeItem('adminToken')  // Clear token or any other admin-specific data
    navigate('/login')
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <Link to="/admin">Home</Link> | 
        <Link to="/admin/questions">All Questions</Link> | 
        <Link to="/admin/users">All Users</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <UserStatistics />
      <div  className="back-home-container">
        <Link to="/admin">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  )
}


