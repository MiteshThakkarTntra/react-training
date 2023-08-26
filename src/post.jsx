import React, { useEffect, useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

const Post = () => {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(false)
  const [viewLoader, setViewLoader] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  useEffect(() => {
    callPost()
  }, []);

  const callPost = () => {
    setLoader(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
        setLoader(false)
      })
  }

  const callViewPost = (id) => {
    setViewLoader(true)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(json => {
        setModalData(json)
        setViewLoader(false)
      })
  }

  const callDeletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    }).then(response => response.json()).then(() => {
      callPost()
    })
  }

  if (loader) {
    return 'loading...'
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearchResult = () => {
    if (searchValue.trim() === '') {
      callPost()
    } else {
      const searchResult = posts.filter((item) => {
        return Number(item.id) === Number(searchValue)
      })
      setPosts(searchResult)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchResult()
    } else {
      return
    }
  }

  const handleViewData = (id) => {
    setModalOpen(true)
    callViewPost(id)
  }

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <>
      <input onChange={(event) => handleSearch(event)} onKeyUp={(event) => handleKeyPress(event)}></input>
      <button onClick={() => handleSearchResult()}>Search</button>
      <button onClick={() => callPost()}>Refresh</button>
      <button onClick={()=> handleLogOut()}>Logout</button>
      {posts.map((data) => {
        return <div key={data.id}>
          ID:<p>{data.id}</p>
          Title:<p>{data.title}</p>
          Body:<p>{data.body}</p>
          <button onClick={() => handleViewData(data.id)}>view</button>
          <button onClick={() => callDeletePost(data.id)}>Delete</button>
        </div>
      })
      }
      <PureModal
        isOpen={modalOpen} onClose={() => {
          setModalOpen(false);
          setModalData({});
          return true;
        }}> {viewLoader? "loading..." :
        <>ID: <p>{modalData.id}</p>
        Title: <p>{modalData.title}</p>
        Body: <p>{modalData.body}</p></>}
 
      </PureModal>
    </>
  );
}

export
  default Post;