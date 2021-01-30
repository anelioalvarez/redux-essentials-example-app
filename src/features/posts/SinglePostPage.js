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

const SinglePostPage = ({ match }) => {
  const { postId } = match.params;
  
  const post = useSelector(state =>
    state.posts.find(post => post.id.toString() === postId)    
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
        <p className='post-content'>{post.content}</p>
      </article>
    </section>
  )
}

export default SinglePostPage