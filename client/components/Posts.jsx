import React from 'react'

import Post from './Post'
import EditPost from './EditPost'
import { useEffect, useState } from 'react'
import { getRegions, getPostsByRegionCode, getPostById } from '../apiClient'

function Posts(props) {
  //JAVASCRIPT
  const { region, district } = props
  const [updated, setUpdated] = useState(false)
  const [posts, setPosts] = useState(null)
  const [validPosts, setValidPosts] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [postToBeUpdated, setPostToBeUpdated] = useState(null)
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
    console.log(district)
  }, [])
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
    // console.log(posts)
  }, [updated])

  useEffect(() => {
    console.log('posts', posts)
    if (posts) {
      const valid = posts.filter((post) => {
        const now = new Date().getTime()
        const differenceMin = (now - post.postedTime) / 1000 / 60
        console.log('diff', differenceMin)
        return differenceMin < 60
      })
      console.log('valid', valid)
      setValidPosts(valid)
    }
  }, [posts])

  function updateState() {
    if (updated) {
      setUpdated(false)
    } else {
      setUpdated(true)
    }
  }

  function offEditMode() {
    setEditMode(false)
  }

  function assignUpdateId(id) {
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
      {!editMode && validPosts && !district
        ? validPosts.map((post) => {
            return (
              <div key={post.postId} className="display-posts">
                <Post
                  key={post.postId}
                  post={post}
                  handlePostsUpdate={handlePostsUpdate}
                  assignUpdateId={assignUpdateId}
                  updateState={updateState}
                />
              </div>
            )
          })
        : null}

      {district && validPosts
        ? validPosts.map((post) => {
            return (
              <div key={post.postId} className="display-posts">
                {post.districtCode === district.code ? (
                  <Post
                    key={post.postId}
                    post={post}
                    handlePostsUpdate={handlePostsUpdate}
                    assignUpdateId={assignUpdateId}
                    updateState={updateState}
                  />
                ) : null}
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
            assignUpdateId={assignUpdateId}
            updateState={updateState}
            offEditMode={offEditMode}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Posts
