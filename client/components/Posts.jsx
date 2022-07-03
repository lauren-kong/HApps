import React from 'react'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Post from './Post'
import EditPost from './EditPost'
import { getPostsByRegionCode, getPostById } from '../apiClient'

function Posts(props) {
  //JAVASCRIPT
  const { regionCode, districtCode } = useParams()
  const [posts, setPosts] = useState(null)
  const [validPosts, setValidPosts] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
  const [postToEdit, setPostToEdit] = useState(null)
  const [toggleChanges, setToggleChanges] = useState(false)
  useEffect(() => {
    getPostsByRegionCode(regionCode).then((postsData) => {
      setPosts(postsData)
    })
  }, [editMode, toggleChanges])

  useEffect(() => {
    if (posts) {
      const valid = posts.filter((post) => {
        const now = new Date().getTime()
        const differenceMin = (now - post.postedTime) / 1000 / 60
        return differenceMin < 60
      })
      setValidPosts(valid)
    }
  }, [posts])

  useEffect(() => {
    if (editMode && editId) {
      getPostById(editId).then((post) => {
        setPostToEdit(post)
      })
    }
  }, [validPosts])

  function onEditMode(id) {
    setEditMode(true)
    setEditId(id)
  }

  function offEditMode() {
    setEditMode(false)
    setEditId(null)
    setPostToEdit(null)
  }

  function handlePostsUpdate(updatePosts) {
    setPosts(updatePosts)
  }

  function toggleChangeHandler() {
    setToggleChanges(!toggleChanges)
  }

  //JSX
  return (
    <div className="below-header">
      <div className="ghost-div"></div>
      {!editMode && validPosts && !districtCode
        ? validPosts.map((post) => {
            return (
              <div key={post.postId} className="display-posts">
                <Post
                  key={post.postId}
                  post={post}
                  handlePostsUpdate={handlePostsUpdate}
                  onEditMode={onEditMode}
                  updateDelete={toggleChangeHandler}
                />
              </div>
            )
          })
        : null}

      {validPosts && districtCode
        ? validPosts.map((post, index) => {
            return (
              <div key={post.postId} className="display-posts">
                {post.districtCode === districtCode ? (
                  <Post
                    key={post.postId}
                    post={post}
                    handlePostsUpdate={handlePostsUpdate}
                    onEditMode={onEditMode}
                    updateDelete={toggleChangeHandler}
                  />
                ) : null}
              </div>
            )
          })
        : null}

      {editMode && postToEdit ? (
        <div key={postToEdit.postId} className="display-posts">
          <EditPost
            key={postToEdit.postId}
            post={postToEdit}
            offEditMode={offEditMode}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Posts
