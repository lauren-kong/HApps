import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import {
  getDistrictsByRegionCode,
  addPost,
  getPostsByRegionCode,
  getDistrictInfoByName,
  uploadImageToCloudinary,
  getPostById,
} from '../apiClient'

function AddPost(props) {
  // useEffect(() => {},[])
  const hiddenButton = useRef()
  const cloudinaryPreset = 'nh01qzjk'
  const { region } = props
  const [images, setImages] = useState([])
  const imageNames = useRef()
  const fileInputRef = useRef()
  const textRef = useRef()
  const [previewImageNum, setPreviewImageNum] = useState(0)
  const previews = useRef()
  const [preview, setPreview] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])

  const [districtsList, setDistrictsList] = useState(null)
  // console.log(region)
  useEffect(() => {
    getDistrictsByRegionCode(region.code).then((districts) => {
      setDistrictsList(districts)
    })
  }, [])

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
    // console.log(filesList)
    // console.log(filesList.length)
    for (let i = 0; i < filesList.length; i++) {
      if (filesList[i] && filesList[i].type.substr(0, 5)) {
        filesArr.push(filesList[i])
      }
    }
    setImages([...images, ...filesArr])
  }

  // useEffect(() => {
  // const names = []
  // if (images.length > 0) {
  //   images.forEach((image) => {
  //     names.push(`/images/${image.name}`)
  //   })
  // }
  // imageNames.current = names
  //   const cloudinaryRes = []
  //   images.map((image) => {
  //     // console.log(image)
  //     const formData = new FormData()
  //     formData.append('file', image)
  //     formData.append('upload_preset', cloudinaryPreset)
  //     uploadImageToCloudinary(formData).then((response) => {
  //       setUploadedImages([...uploadedImages, response])
  //     })
  //   })
  // }, [images])

  // useEffect(() => {
  //   console.log(uploadedImages)
  // }, [uploadedImages])

  // FileReader for Each Image  -> for preview
  useEffect(() => {
    const src = []
    if (images.length > 0) {
      images.forEach((image) => {
        const readerAll = new FileReader()
        readerAll.onloadend = () => {
          src.push(readerAll.result)
        }
        readerAll.readAsDataURL(image)
      })
      const readerOne = new FileReader()
      readerOne.onloadend = () => {
        setPreview(readerOne.result)
      }
      readerOne.readAsDataURL(images[previewImageNum])
    }
    previews.current = src
  }, [images])

  useEffect(() => {
    if (images.length > 0) {
      const readerOne = new FileReader()
      readerOne.onloadend = () => {
        setPreview(readerOne.result)
      }
      readerOne.readAsDataURL(images[previewImageNum])
    }
  }, [previewImageNum])

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

  function resetPhotosHandler(e) {
    e.preventDefault()
    setImages([])
    setPreview(null)
    setPreviewImageNum(0)
    previews.current = null
    imageNames.current = null
  }

  const [newPostDistrict, setNewPostDistrict] = useState('')
  const newPostDistrictCode = useRef('')
  useEffect(() => {
    districtsList && setNewPostDistrict(districtsList[0].name)
  }, [districtsList])

  function handleDistrictChange(e) {
    // console.log(e.target.value)
    setNewPostDistrict(e.target.value)
  }

  useEffect(() => {
    getDistrictInfoByName(newPostDistrict).then((distInfo) => {
      newPostDistrictCode.current = distInfo.code
    })
  }, [newPostDistrict])

  const [newPostEvent, setNewPostEvent] = useState(null)
  function handleEventChange(e) {
    setNewPostEvent(e.target.value)
  }

  const [newPostLocation, setNewPostLocation] = useState(null)
  function handleLocationChange(e) {
    setNewPostLocation(e.target.value)
  }

  const [newPostDescription, setNewPostDescription] = useState(null)
  function handleDescriptionChange(e) {
    setNewPostDescription(e.target.value)
  }

  const [newPostPassword, setNewPostPassword] = useState(null)
  function handlePasswordChange(e) {
    setNewPostPassword(e.target.value)
  }

  function handleFormSubmit(e) {
    console.log('district: ', newPostDistrict)
    console.log('location: ', newPostLocation)
    console.log('event name: ', newPostEvent)
    console.log('description: ', newPostDescription)
    console.log('password: ', newPostPassword)
    if (
      images.length > 0 &&
      newPostDistrict &&
      newPostEvent &&
      newPostDescription &&
      newPostPassword
    ) {
      const uploadPromises = images.map((image) => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', cloudinaryPreset)
        return uploadImageToCloudinary(formData)
      })

      Promise.all(uploadPromises).then((data) => {
        setUploadedImages(data)
      })
    }
  }

  useEffect(() => {
    if (images.length > 0 && uploadedImages.length === images.length) {
      console.log(uploadedImages)
      const today = new Date()
      const newPost = {
        password: newPostPassword,
        regionCode: region.code,
        districtCode: newPostDistrictCode.current,
        postImages: JSON.stringify(uploadedImages),
        eventName: newPostEvent,
        location: newPostLocation,
        postedTime: today.getTime(),
        description: newPostDescription,
      }
      addPost(newPost).then((newId) => {
        console.log(newId)
        console.log('submitted')
        getPostById(newId).then((post) => {
          console.log(post)
          hiddenButton.current.click()
        })
      })
    }
  }, [uploadedImages])

  return (
    <div className="below-header add-form-main">
      <div className="add-photo-div">
        {!images || images.length === 0 ? (
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

        {images && images.length > 0 ? (
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
                onClick={resetPhotosHandler}
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
                className="event-name"
                required
                type="text"
                // value={newPostEvent}
                placeholder="Event Name"
                onChange={handleEventChange}
              />
            </div>
            <div>
              <input
                className="location-input"
                required
                type="text"
                // value={newPostLocation}
                placeholder="Location Details"
                onChange={handleLocationChange}
              />
            </div>
            <div className="description-div">
              <textarea
                ref={textRef}
                className="description-input"
                type="textarea"
                // value={newPostDescription}
                placeholder="Text..."
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        </div>
        <div className="password-and-button">
          <input
            className="password-input"
            required
            type="password"
            // value={newPostPassword}
            placeholder="password"
            onChange={handlePasswordChange}
          />
          <button onClick={handleFormSubmit}>Post</button>
          <Link to={`/locations/${region.code}`} ref={hiddenButton}>
            <button hidden="hidden">Move</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddPost
