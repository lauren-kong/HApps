import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import {
  getPostsByRegionCode,
  updatePostClicked,
  deletePost,
  deleteImagesOnCloudinary,
} from '../apiClient'
import sha256 from 'crypto-js/sha256'
import { Link } from 'react-router-dom'

function Post(props) {
  const api_key = '739489637624155'
  const api_secret = 'r3LH1BeNQUYG8mAKIXA0w7WvZAQ'
  const { post, handlePostsUpdate, assignUpdateId, updateState } = props
  // useEffect(() => {
  //   console.log(typeof post.postImages[0] === 'object')
  // }, [])

  const [passwordInDelPrompt, setPasswordInDelPrompt] = useState(null)
  const [passwordInUpdatePrompt, setPasswordInUpdatePrompt] = useState(null)

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

  function binButtonClickHandler(e) {
    e.preventDefault()
    const current = prompt('Please enter post password')
    setPasswordInDelPrompt(current)
  }

  useEffect(() => {
    if (!passwordInDelPrompt) {
      return null
    } else if (passwordInDelPrompt === post.password) {
      console.log('need to delete this post')
      deletePost(post.postId).then((res) => {
        if (typeof post.postImages[0] === 'object') {
          post.postImages.map((img) => {
            const timestamp = new Date().getTime()
            const string = `public_id=${img.publicId}&timestamp=${timestamp}${api_secret}`
            const signature = sha256(string)
            const formData = new FormData()
            console.log(img.signature)
            formData.append('public_id', img.publicId)
            formData.append('signature', signature)
            formData.append('api_key', api_key)
            formData.append('timestamp', timestamp)
            deleteImagesOnCloudinary(formData).then((res) => {
              console.log(res)
              updateState()
            })
          })
        }
      })
    } else {
      setPasswordInDelPrompt(prompt('The password is incorrect. Try again'))
    }
  }, [passwordInDelPrompt])

  function editButtonClickHandler(e) {
    const password = prompt('Please enter post password')
    // if (password === post.password) {
    //   assignUpdateId(post.postId)
    // }

    setPasswordInUpdatePrompt(password)
  }

  useEffect(() => {
    if (passwordInUpdatePrompt) {
      if (passwordInUpdatePrompt === post.password) {
        assignUpdateId(post.postId)
      } else {
        setPasswordInUpdatePrompt(
          prompt('The password is incorrect. Try again')
        )
      }
    }
  }, [passwordInUpdatePrompt])

  return (
    <div className="each-post">
      {/* Post - images */}
      <div className="post-images">
        <button onMouseDown={handlePrevClick}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <div className="post-img-div">
          {typeof post.postImages[0] === 'object' ? (
            <img
              src={post.postImages[imageNum].url}
              alt="post"
              onMouseDown={handleImageClick}
              onContextMenu={handleImageClick}
            />
          ) : (
            <img
              src={post.postImages[imageNum]}
              alt="post"
              onMouseDown={handleImageClick}
              onContextMenu={handleImageClick}
            />
          )}
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
        <div className="post-time">
          {new Date(post.postedTime).toLocaleString('en-NZ')}
        </div>
        <div className="post-event">{post.eventName}</div>
        <div className="post-location">{post.location}</div>
        <div className="post-description">{post.description}</div>
      </div>

      <div>
        <button onClick={binButtonClickHandler}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={editButtonClickHandler}>Edit</button>
      </div>
    </div>
  )
}

export default Post
