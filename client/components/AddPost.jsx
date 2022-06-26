import React from 'react'
import { useEffect, useState, useRef } from 'react'

import { getDistrictsByRegionCode } from '../apiClient'

function AddPost(props) {
  // useEffect(() => {},[])

  const { region } = props
  const [images, setImages] = useState([])
  const fileInputRef = useRef()
  const textRef = useRef()
  const [previewImageNum, setPreviewImageNum] = useState(0)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    textRef.current.focus()
  }, [])

  function addPhotosButtonHandler(e) {
    e.preventDefault()
    fileInputRef.current.click()
  }

  function addPhotosChangeHandler(e) {
    e.preventDefault()
    const filesList = e.target.files
    const filesArr = []
    console.log(filesList)
    console.log(filesList.length)
    for (let i = 0; i < filesList.length; i++) {
      if (filesList[i] && filesList[i].type.substr(0, 5)) {
        filesArr.push(filesList[i])
      }
    }
    setImages([...images, ...filesArr])
  }

  useEffect(() => {
    console.log(images)
    if (images.length > 0) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(images[previewImageNum])
    }
  }, [images, previewImageNum])

  function handlePrevClick(e) {
    e.preventDefault()
    preview && previewImageNum > 0
      ? setPreviewImageNum(previewImageNum - 1)
      : setPreviewImageNum(0)
  }

  function handleNextClick(e) {
    e.preventDefault()
    preview && previewImageNum === images.length - 1
      ? setPreviewImageNum(previewImageNum)
      : setPreviewImageNum(previewImageNum + 1)
  }

  function handleImageClick(e) {
    e.preventDefault()
  }

  function reChoosePhotoHandler(e) {
    e.preventDefault()
    setImages([])
    setPreview(null)
  }

  const [districtsList, setDistrictsList] = useState(null)
  // console.log(region)
  useEffect(() => {
    getDistrictsByRegionCode(region.code).then((districts) => {
      setDistrictsList(districts)
    })
  }, [])

  const [newPostDistrict, setNewPostDistrict] = useState('')
  function handleDistrictChange(e) {
    // console.log(e.target.value)
    setNewPostDistrict(e.target.value)
  }

  const [newPostLocation, setNewPostLocation] = useState(null)
  function handleLocationChange(e) {
    setNewPostLocation(e.target.value)
  }

  const [newPostDescription, setNewPostDescription] = useState(null)
  function handleDescriptionChange(e) {
    setNewPostDescription(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className="below-header add-form-main">
      <div className="add-photo-div">
        {!preview ? (
          <>
            <button
              className="add-photos-button"
              onClick={addPhotosButtonHandler}
            >
              Add Photos
            </button>
            <input
              multiple
              accept="image/*"
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={addPhotosChangeHandler}
            />
          </>
        ) : null}

        {preview ? (
          <div className="preview-overall">
            <div className="show-image-number">
              {previewImageNum + 1}/{images.length}
            </div>
            <div className="preview-div">
              <button onMouseDown={handlePrevClick}>
                <i className="fa-solid fa-caret-left"></i>
              </button>
              <div className="post-img-div">
                <img
                  src={preview}
                  alt="post"
                  onMouseDown={handleImageClick}
                  onContextMenu={handleImageClick}
                  className="preview-photos"
                />
              </div>
              <button onMouseDown={handleNextClick}>
                <i className="fa-solid fa-caret-right"></i>
              </button>
            </div>
            <div className="reset-photos-div">
              <button
                onClick={reChoosePhotoHandler}
                className="reset-photos-button"
              >
                Reset Photos
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="other-form-and-submit">
        <div className="other-form-main">
          <div className="add-post-districts-div">
            <select
              className="add-post-districts-select"
              value={newPostDistrict}
              onChange={handleDistrictChange}
            >
              {districtsList
                ? districtsList.map((dist) => {
                    return (
                      <option
                        key={dist.code}
                        value={dist.name}
                        className="add-post-district-option"
                      >
                        {dist.name}
                      </option>
                    )
                  })
                : null}
            </select>
            <div>
              <input
                className="location-input"
                required
                type="text"
                value={newPostLocation}
                placeholder="Location Details"
              />
            </div>
            <div className="description-div">
              <textarea
                ref={textRef}
                className="description-input"
                type="textarea"
                value={newPostDescription}
                placeholder="Text..."
              />
            </div>
          </div>
        </div>
        <div className="password-and-button">
          <input
            className="password-input"
            required
            type="password"
            value={newPostDescription}
            placeholder="password"
          />
          <button>Post</button>
        </div>
      </div>
    </div>
  )
}

export default AddPost
