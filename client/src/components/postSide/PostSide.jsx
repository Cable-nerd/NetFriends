import React from 'react'

import './PostSide.css'
import PostShare from '../postShare/PostShare'
import Posts from '../posts/Posts'

const PostSide = () => {
  return (
   <div className="PostSide">
       <PostShare/>
       <Posts/>
   </div>
  )
}

export default PostSide