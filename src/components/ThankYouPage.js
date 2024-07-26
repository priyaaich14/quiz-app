import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Thank You for Taking the Test!</h1>
      <button onClick={() => navigate('/user')}>Back to Home Page</button>
    </div>
  )
}


