import React from 'react'

import Post from './Post'
import { useEffect, useState } from 'react'
import { getRegions, getPostsByRegionCode } from '../apiClient'

function Posts(props) {
  //JAVASCRIPT
  const { region } = props

  const [posts, setPosts] = useState(null)
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
    // console.log(posts)
  }, [])

  // console.log(posts)

  function handlePostsUpdate(updatePosts) {
    setPosts(updatePosts)
  }

  //JSX
  return (
    <div id="POSTS">
      <div className="ghost-div"></div>
      {posts
        ? posts.map((post) => {
            return (
              <div key={post.postId} className="display-posts">
                <Post
                  key={post.postId}
                  post={post}
                  handlePostsUpdate={handlePostsUpdate}
                />
              </div>
            )
          })
        : null}
    </div>
  )
}

export default Posts
