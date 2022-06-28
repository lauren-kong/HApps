import React from 'react'

import Post from './Post'
import EditPost from './EditPost'
import { useEffect, useState } from 'react'
import { getRegions, getPostsByRegionCode, getPostById } from '../apiClient'

function Posts(props) {
  //JAVASCRIPT
  const { region } = props
  const [updated, setUpdated] = useState(false)
  const [posts, setPosts] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [postToBeUpdated, setPostToBeUpdated] = useState(null)
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
    // console.log(posts)
  }, [])
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
    // console.log(posts)
  }, [updated])

  // useEffect(() => {
  //   console.log(posts)
  // }, [posts])

  function updateState() {
    if (updated) {
      setUpdated(false)
    } else {
      setUpdated(true)
    }
  }

  function updateToEditMode(id) {
    setUpdateId(id)
  }

  useEffect(() => {
    if (updateId) {
      setEditMode(true)
    }
  }, [updateId])

  useEffect(() => {
    if (editMode) {
      getPostById(updateId).then((post) => {
        setPostToBeUpdated(post)
      })
    }
  }, [editMode])

  function handlePostsUpdate(updatePosts) {
    setPosts(updatePosts)
  }

  //JSX
  return (
    <div className="below-header">
      <div className="ghost-div"></div>
      {!editMode && posts
        ? posts.map((post) => {
            return (
              <div key={post.postId} className="display-posts">
                <Post
                  key={post.postId}
                  post={post}
                  handlePostsUpdate={handlePostsUpdate}
                  updateToEditMode={updateToEditMode}
                  updateState={updateState}
                />
              </div>
            )
          })
        : null}

      {editMode && postToBeUpdated ? (
        <div key={postToBeUpdated.postId} className="display-posts">
          <EditPost
            key={postToBeUpdated.postId}
            post={postToBeUpdated}
            handlePostsUpdate={handlePostsUpdate}
            updateToEditMode={updateToEditMode}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Posts
