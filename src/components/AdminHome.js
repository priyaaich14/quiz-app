import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear specific session data, NOT all localStorage data
    localStorage.removeItem('adminToken') // Assuming you store an admin token
    // Any other session-specific cleanups here
    navigate('/login') // Navigate to login after cleanup
  }

  return (
    <div className="admin-home-container">
      <h2>Welcome Admin !!!</h2>
      <nav>
        <Link to="/admin/dashboard">Admin Dashboard</Link> | 
        <Link to="/admin/questions">All Questions</Link> | 
        <Link to="/admin/users">All Users</Link> | 
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  )
}


