import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import CalendarsContainer from './components/CalendarsContainer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }
  setCurrentUser (user) {
    // window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', `${user.token}`)
    this.setState({ currentUser: user })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <main className='main'>
            <div className='board'>
              <Route path='/Login' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/Register' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <Register setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/CalendarList' render={(props) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <CalendarsContainer setCurrentUser={this.setCurrentUser} />
                </Guard>} />

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
