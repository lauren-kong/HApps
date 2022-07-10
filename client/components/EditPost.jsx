import React, { useState, useEffect, useRef } from 'react'
import sha256 from 'crypto-js/sha256'

import {
  deletePost,
  deleteImagesOnCloudinary,
  updatePost,
} from '../apiClient/apiClient'

function EditPost(props) {
  const { post, offEditMode } = props

  const firstInputRef = useRef()

  const [imageNum, setImageNum] = useState(0)
  const [updatedEventName, setUpdatedEventName] = useState(post.eventName)
  const [updatedLocation, setUpdatedLocation] = useState(post.location)
  const [updatedDescription, setUpdatedDescription] = useState(post.description)

  function handlePrevClick(e) {
    e.preventDefault()
    imageNum > 0 ? setImageNum(imageNum - 1) : setImageNum(0)
  }
  1

  function handleNextClick(e) {
    e.preventDefault()
    imageNum === post.postImages.length - 1
      ? setImageNum(imageNum)
      : setImageNum(imageNum + 1)
  }

  useEffect(() => {
    firstInputRef.current.focus()
  }, [])

  function handleImageClick(e) {
    e.preventDefault()
  }

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
    const updated = {
      id: post.id,
      eventName: updatedEventName,
      location: updatedLocation,
      description: updatedDescription,
    }
    updatePost(updated).then((res) => {
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

      {/* Post - Details */}
      <div className="post-details edit">
        <div className="post-time">
          {new Date(post.postedTime).toLocaleString('en-NZ')}
        </div>
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

      <div className="update-button">
        <button onClick={updateButtonClickHandler}>Update</button>
      </div>
    </div>
  )
}

export default EditPost
