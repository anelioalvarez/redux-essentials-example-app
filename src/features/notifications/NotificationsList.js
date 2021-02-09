import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import classnames from 'classnames';

import { selectAllUsers } from '../users/usersSlice';
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice';


const NotificationsList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const notifications = useSelector(selectAllNotifications);

  useEffect(() => {
    dispatch(allNotificationsRead());
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknow User'
    };

    const notificationClassname = classnames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClassname}>
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
