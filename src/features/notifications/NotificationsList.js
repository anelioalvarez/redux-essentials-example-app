import React from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { selectAllUsers } from '../users/usersSlice';
import { selectAllNotifications } from './notificationsSlice';


const NotificationsList = () => {
  const users = useSelector(selectAllUsers);
  const notifications = useSelector(selectAllNotifications);

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknow User'
    };

    return (
      <div key={notification.id} className='notification'>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  });

  return (
    <section className='notificationsList'>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList
