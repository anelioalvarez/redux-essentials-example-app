import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  
  const fetchNowNotifications = () => dispatch(fetchNotifications());

  const numUnreadNotifications = useSelector(state => (
    selectAllNotifications(state)
      .filter(notification => !notification.read)
      .length
  ));
  const showBadge = numUnreadNotifications ?
    <span className='badge'>
      {numUnreadNotifications}
    </span> : null;


  return (
    <nav>
      <section>
        <h1>Main Posts Feed</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to='/'>Posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>Notifications {showBadge}</Link>
          </div>
          <button className='button' onClick={fetchNowNotifications}>
            Fetch Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
