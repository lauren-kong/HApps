import React from 'react'

import Header from './Header'
import Post from './Post'
import { useEffect, useState } from 'react'
import { getRegions, getPostsByRegionCode } from '../apiClient'

function Posts(props) {
  //JAVASCRIPT
  const { region } = props

  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPostsByRegionCode(region.code).then((postsData) => {
      setPosts(postsData)
    })
  }, [])

  //JSX
  return (
    <div>
      <Header />
      {posts.map((post) => {
        return (
          <div key="post-div" className="display-posts">
            <Post key={post.postId} post={post} />
          </div>
        )
      })}
    </div>
  )
}

export default Posts
