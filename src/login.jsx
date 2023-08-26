import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('')

  const handleChange = (value) => {
    setEmail(value)
  }

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', true)
  }

  return (
    <>
      <div>
        <input
          placeholder='email'
          value={email}
          onChange={(event) => handleChange(event.target.value)}
        />
        <button onClick={() => handleLogin()}>Login</button>
      </div>
    </>
  )
}

export default Login;