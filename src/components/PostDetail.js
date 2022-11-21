import styles from './PostDetail.module.css'

import React from 'react'
import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt= {post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        
        <div className={styles.tags}>
            {post && post.tagsArray.map( tag =>(
                <p key={post.id}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
        </div>
        <Link className='btn btn-outline' to={`posts/${post.id}`}>
            Ler
        </Link>


    </div>
  )
}

export default PostDetail