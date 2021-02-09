import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import NotificationsList from './features/notifications/NotificationsList'
import AddPostForm from './features/posts/AddPostForm'
import EditPostForm from './features/posts/EditPostForm'
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import UserPage from './features/users/UserPage'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <AddPostForm />
                <PostsList />
              </Fragment>
            )}
          />
          <Route exact path='/posts/:postId' component={SinglePostPage}/>
          <Route exact path='/posts/editPost/:postId' component={EditPostForm}/>
          <Route exact path='/users' component={UsersList}/>
          <Route exact path='/users/:userId' component={UserPage}/>
          <Route exact path='/notifications' component={NotificationsList}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
