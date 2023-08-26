import './App.css'
import Todo from './todo'
// import Game from './ticTac'
import Post from './post'

function App() {
  const defaultData = {todo: 'Testing', editable: false}
  return (
    <>
    <Post />
    {/* <Todo apiData={defaultData} >
    </Todo> */}
    {/* <Game /> */}
    </>

  )
}

export default App
