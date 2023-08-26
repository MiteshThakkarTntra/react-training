import { useState } from 'react'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

function Todo(props) {
  const [todo, setTodo] = useState('')
  const [editTodo, setEditTodo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [todoList, setTodoList] = useState([props.apiData])
  const addTodo = () => {
    const isTodoPresent = todoList.some((item) => {
     return item.todo.toLowerCase() === todo.toLowerCase() 
    })
    if (isTodoPresent){
      alert('Data already present')
    } else {
      setTodoList([...todoList, { 'todo': todo.trim(), 'editable': false }])
      setTodo('')
      setModalOpen(false)
    }
  }

  const handleDelete = (data) => {
    const updatedTodo = todoList.filter((item) => item.todo !== data.todo)
    setTodoList(updatedTodo)
  }

  const handleEdit = (data) => {
    const editTodo = todoList.map((item) => {
      if (item.todo === data.todo) {
        return { ...item, editable: true }
      }
      return item
    })
    setTodoList(editTodo)
    setEditTodo(data.todo)
  }

  const handleSave = (data) => {
    const isTodoPresent = todoList.some((item) => {
      return item.todo.toLowerCase() === editTodo.toLocaleLowerCase() 
     })
     if (isTodoPresent) {
      alert('Already Present')
     } else {
      
       const updatedTodo = todoList.map((item) => {
         if (item.todo === data.todo) {
           return { todo: editTodo.trim(), editable: false }
         }
         return item
       })
       setTodoList(updatedTodo)
       setEditTodo('')
     }
  }

  const onChange = (data) => {
    setEditTodo(data)
  }

  const handleKeyPress = (event, key, data = null) => {
    if (event.key === 'Enter' && key === 'add' && !isAddDisabled()) {
      addTodo()
    } else if (event.key === 'Enter' && editTodo.trim() !== '') {
      handleSave(data)
    }
  }

  const isAddDisabled = () => {
    return todo.trim() === '' ? true : false
  }

  const handleModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <button onClick={() => handleModal()}>Add Todo</button>
      <div>
        {
          todoList.map((item, index) => {
            return <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>
              {item.editable ? <input onKeyUp={(event) => handleKeyPress(event, 'edit', item)} value={editTodo} onChange={(event) => onChange(event.target.value)} /> : <span style={{ display: 'flex', flexDirection: 'column' }}>{item.todo}</span>}
              <button onClick={() => handleDelete(item)}>Remove</button>
              {item.editable ? <button disabled={editTodo.trim() === ''} onClick={() => handleSave(item)}>Save</button> : <button onClick={() => handleEdit(item)}>Edit</button>}
            </div>
          })
        }
      </div>
      <div>
      </div>
      <PureModal isOpen={modalOpen} onClose={() => {
        setModalOpen(false);
        setTodo('')
        return true;
      }}>
      <div>
        <input value={todo} placeholder='add todo' onKeyUp={(event) => handleKeyPress(event, 'add')} onChange={(event) => setTodo(event.target.value)} /><button disabled={todo.trim() === ''} onClick={() => addTodo()}>Save Todo</button>
      </div>
        <p>Testing the Modal</p>
      </PureModal>
      <img src='vite.svg'/>
    </>
  )
}

export default Todo 