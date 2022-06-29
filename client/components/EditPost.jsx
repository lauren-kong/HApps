import React, { useState, useEffect, useRef } from 'react'
import sha256 from 'crypto-js/sha256'

import {
  getPostsByRegionCode,
  updatePostClicked,
  deletePost,
  deleteImagesOnCloudinary,
  updatePost,
} from '../apiClient'

function EditPost(props) {
  console.log(props)

  const api_key = '739489637624155'
  const api_secret = 'r3LH1BeNQUYG8mAKIXA0w7WvZAQ'
  const {
    post,
    handlePostsUpdate,
    updateToEditMode,
    updateState,
    offEditMode,
  } = props
  // useEffect(() => {
  //   console.log(typeof post.postImages[0] === 'object')
  // }, [])

  const firstInputRef = useRef()

  const [passwordInPrompt, setPasswordInPrompt] = useState(null)

  const [imageNum, setImageNum] = useState(0)

  const [isInitialRender, setIsInitialRender] = useState(true)

  const [updatedEventName, setUpdatedEventName] = useState(post.eventName)
  const [updatedLocation, setUpdatedLocation] = useState(post.location)
  const [updatedDescription, setUpdatedDescription] = useState(post.description)
  const [updatedPassword, setUpdatedPassword] = useState(post.password)

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

  useEffect(() => {
    setIsInitialRender(false)
    firstInputRef.current.focus()
  }, [])

  function handleImageClick(e) {
    e.preventDefault()
  }

  function binButtonClickHandler(e) {
    e.preventDefault()
    const current = prompt('Please enter post password')
    setPasswordInPrompt(current)
  }
  useEffect(() => {
    if (!passwordInPrompt) {
      return null
    } else if (passwordInPrompt === post.password) {
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
            })
          })
        }
      })
    } else {
      setPasswordInPrompt(prompt('The password is incorrect. Try again'))
    }
  }, [passwordInPrompt])

  function eventNameChangeHandler(e) {
    setUpdatedEventName(e.target.value)
  }

  function locationChangeHandler(e) {
    setUpdatedLocation(e.target.value)
  }

  function descriptionChangeHandler(e) {
    setUpdatedDescription(e.target.value)
  }

  function updateButtonClickHandler(e) {
    console.log('id', post.id)
    console.log('eventName', updatedEventName)
    console.log('location', updatedLocation)
    console.log('description', updatedDescription)

    const updated = {
      id: post.id,
      eventName: updatedEventName,
      location: updatedLocation,
      description: updatedDescription,
    }
    updatePost(updated).then((res) => {
      console.log(res)
      offEditMode()
    })
  }

  return (
    <div className="each-post edit">
      {/* EditPost - images */}
      <div className="post-images edit">
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
      <div className="reliab-div edit">
        {/* {reliabClicked && (
          <div className="fa-button" onClick={handleReliabClick}>
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
        )}
        {!reliabClicked && (
          <div className="fa-button" onClick={handleReliabClick}>
            <i className="fa-regular fa-thumbs-up"></i>
          </div>
        )} */}
      </div>

      {/* Post - Details */}
      <div className="post-details edit">
        <div className="post-time">{post.postedTime}</div>
        <div className="post-event edit">
          <input
            ref={firstInputRef}
            type="text"
            defaultValue={updatedEventName}
            placeholder={post.eventName}
            onChange={eventNameChangeHandler}
          />
        </div>
        <div className="post-location edit">
          <input
            type="text"
            defaultValue={updatedLocation}
            placeholder={post.location}
            onChange={locationChangeHandler}
          />
        </div>
        <div className="post-description edit">
          <textarea
            type="text"
            defaultValue={updatedDescription}
            placeholder={post.description}
            onChange={descriptionChangeHandler}
          />
        </div>
      </div>

      <div>
        {/* <button onClick={binButtonClickHandler}>
          <i className="fa-solid fa-trash-can"></i>
        </button> */}
        <button onClick={updateButtonClickHandler}>Update</button>
      </div>
    </div>
  )
}

export default EditPost