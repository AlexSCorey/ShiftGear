import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
// import Dashboard from './components/Dashboard'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }
  setCurrentUser (user) {
    console.log('user in app.js')
    // window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user)
    this.setState({ currentUser: user })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <main className='main'>
            <div className='board'>
              <Route path='/Login' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/Register' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Register setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              {/* <Route path='/dashboard' render={() =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Dashboard />
                </Guard>} /> */}
            </div>
          </main>
        </div>
      </Router>
    )
  }
}
const Guard = ({ redirectTo, condition, children }) => {
  if (condition) {
    return children
  } else {
    return <Redirect to={redirectTo} />
  }
}

export default App
