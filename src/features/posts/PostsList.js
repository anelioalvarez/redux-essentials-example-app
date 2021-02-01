import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const PostsList = () => {
  const orderedPosts = [...useSelector(state => state.posts)]
    .sort((post1, post2) => post2.date.localeCompare(post1.date)
  );

  const renderedPosts = orderedPosts.map(post => (
    <article
      className='post-excerpt'
      key={post.id}
    >
      <h3>{post.title}</h3>
      <p className='post-content'>
        {post.content.substring(0, 100)}
      </p>
      <Link
        to={`/posts/${post.id}`}
        className='button muted-button'
      >
        View Post
      </Link>
      <PostAuthor userId={post.user}/>
      <TimeAgo timestamp={post.date} />
    </article>
  ));
  
  return (
    <section className='posts-list'>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
