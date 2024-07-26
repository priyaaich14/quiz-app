import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import users from "../data/users.json";

export default function Login() {
  const { handleLogin } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      password
    }

    const user = users.find((ele) => {
      return ele.username === formData.username && ele.password === formData.password
    })

    if (user) {
      handleLogin(user)
      setErrMessage('')
      navigate(user.role === 'admin' ? '/admin' : '/user')
    } else {
      setErrMessage('Invalid Credentials')
    }
  }

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      {errMessage && <p className="error">{errMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="login-button" />
        </div>
      </form>
    </div>
  )
}
