import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { fetchPosts, selectAllPosts } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';


const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPosts = useSelector(selectAllPosts)
    .slice()
    .sort((post1, post2) => post2.date.localeCompare(post1.date)
  );

  const postsStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  const renderedPosts = orderedPosts.map(post => (
    <article
      className='post-excerpt'
      key={post.id}
    >
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user}/>
      <TimeAgo timestamp={post.date} />
      <p className='post-content'>
        {post.content.substring(0, 100)}
      </p>
      <ReactionButtons post={post}/>
      <Link
        to={`/posts/${post.id}`}
        className='button muted-button'
      >
        View Post
      </Link>
    </article>
  ));

  const showLoader = <div className='loader'>Loading...</div>;
  const showError = <div>Error: {error}</div>;

  let content;
  if (postsStatus === 'succeeded') { content = renderedPosts }
  else if (postsStatus === 'loading') { content = showLoader }
  else if (postsStatus === 'failed') { content = showError }
  
  return (
    <section className='posts-list'>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
