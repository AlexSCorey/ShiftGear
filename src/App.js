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
import CreateCalendar from './components/CreateCalendar'
import EditCalendar from './components/EditCalendar'

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

              <Route path='/Calendar/:id/RegisterUser' render={({ match }) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <Register setCurrentUser={this.setCurrentUser} id={match.params.id} />
                </Guard>} />

              <Route path='/CalendarList' render={(props) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <CalendarsContainer setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/Calender/:id' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <EditCalendar id={match.params.id} />
                </Guard>} />

              <Route path='/CreateCalendar' render={({ props }) =>
                <Guard condition={!this.state.currentUser} redirectTo='/Login'>
                  <CreateCalendar />
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
