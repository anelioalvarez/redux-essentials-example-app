import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

const UserPage = ({ match }) => {
  //console.log(match); // debug
  const { userId } = match.params;

  const user = useSelector(state => selectUserById(state, userId));
  const postsForUser = useSelector(state => selectPostsByUser(state, userId));

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    )
  }

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
