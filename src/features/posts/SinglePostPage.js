/*
React Router pasa el objeto match como una prop,
el cual contiene informacion de la URL que estamos buscando.

Al configurar la ruta para representar este componente, le
diremos que analice la segunda parte de la URL como una
variable llamada 'postId',
y poder leer ese valor desde match.params
*/
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

const SinglePostPage = ({ match }) => {
  const { postId } = match.params;
  
  const post = useSelector(state =>
    state.posts.find(post => post.id === postId)    
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className='post'>
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <p className='post-content'>{post.content}</p>
        <ReactionButtons post={post}/>
        <Link
          to={`editPost/${postId}`}
          className='button muted-button'
        >
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
