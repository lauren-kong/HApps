import React from 'react'

function Post(props) {
  const { post } = props
  function handlePrevClick(e) {
    e.preventDefault()
    console.log('prev')
  }

  function handleNextClick(e) {
    e.preventDefault()
    console.log('next')
  }

  return (
    <div>
      <div className="post-images">
        <button onMouseDown={handlePrevClick}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <img src="" alt="" />
        <button onMouseDown={handleNextClick}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Post
