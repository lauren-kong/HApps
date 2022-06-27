import React, { useState } from 'react'
import { useEffect } from 'react'

import { getPostsByRegionCode, updatePostClicked } from '../apiClient'

function Post(props) {
  const { post, handlePostsUpdate } = props
  // useEffect(() => {
  //   console.log(post)
  // }, [])

  const [imageNum, setImageNum] = useState(0)

  const [reliabClicked, setReliabClicked] = useState(false)

  const [reliabCount, setReliabCount] = useState(post.reliability)

  const [isInitialRender, setIsInitialRender] = useState(true)

  function handlePrevClick(e) {
    e.preventDefault()
    imageNum > 0 ? setImageNum(imageNum - 1) : setImageNum(0)
  }

  function handleNextClick(e) {
    e.preventDefault()
    imageNum === post.postImages.length - 1
      ? setImageNum(imageNum)
      : setImageNum(imageNum + 1)
  }

  function handleReliabClick(e) {
    reliabClicked ? setReliabClicked(false) : setReliabClicked(true)
  }

  useEffect(() => {
    setIsInitialRender(false)
  }, [])

  useEffect(() => {
    !isInitialRender &&
      (reliabClicked
        ? setReliabCount(reliabCount + 1)
        : setReliabCount(reliabCount - 1))

    updatePostClicked(post.postId, reliabClicked).then((res) => {
      getPostsByRegionCode(post.regionCode).then((posts) => {
        handlePostsUpdate(posts)

        // console.log(posts)
      })
    })
  }, [reliabClicked])

  function handleImageClick(e) {
    e.preventDefault()
  }

  return (
    <div className="each-post">
      {/* Post - images */}
      <div className="post-images">
        <button onMouseDown={handlePrevClick}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <div className="post-img-div">
          <img
            src={post.postImages[imageNum]}
            alt="post"
            onMouseDown={handleImageClick}
            onContextMenu={handleImageClick}
          />
        </div>
        <button onMouseDown={handleNextClick}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>

      {/* Post - Reliability Button */}
      <div className="reliab-div">
        {reliabClicked && (
          <div className="fa-button" onClick={handleReliabClick}>
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
        )}
        {!reliabClicked && (
          <div className="fa-button" onClick={handleReliabClick}>
            <i className="fa-regular fa-thumbs-up"></i>
          </div>
        )}
      </div>

      {/* Post - Details */}
      <div className="post-details">
        <div className="post-time">{post.postedTime}</div>
        <div className="post-event">{post.eventName}</div>
        <div className="post-location">{post.location}</div>
        <div className="post-description">{post.description}</div>
      </div>

      <div>
        <button></button>
      </div>
    </div>
  )
}

export default Post
