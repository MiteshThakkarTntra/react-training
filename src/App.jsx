import './App.css'
import Todo from './todo'
// import Game from './ticTac'
import Post from './post'
import Login from './login'
import { useEffect, useState } from 'react'

function App() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    setLogin(localStorage.getItem('isLoggedIn'))
  }, [JSON.parse(localStorage.getItem('isLoggedIn'))]); // this will need refresh because we need event listener for local storage

  // const defaultData = { todo: 'Testing', editable: false }

  return (
    <>
      {login? <Post /> : <Login />}
    </>
  )
}

export default App
