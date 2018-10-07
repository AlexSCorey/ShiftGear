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
import NewUserRegister from './components/NewUserRegister'
import AddEmployeeToCalendar from './components/AddEmployeeToCalendar'
import ShiftSelection from './components/ShiftSelection'
import WeekView from './components/WeekView'
import UpdateProfile from './components/UpdateProfile'
import DayView from './components/DayView'
class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setNewUser = this.setNewUser.bind(this)
  }
  setNewUser (user) {
    console.log(user, 'user in app js new user')
    window.localStorage.setItem('token', `${user}`)
    this.setState({ currentUser: user })
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
              {/* <Route path='' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <Login id={match.params.id} />
                </Guard>} /> */}
              <Route path='/Login' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/welcome/:id' render={({ match }) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <NewUserRegister setNewUser={this.setNewUser}
                    id={match.params.id} />
                </Guard>} />

              <Route path='/Register' render={(props) =>
                <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                  <Register setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/Calendar/:id/AddEmployee' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                  <AddEmployeeToCalendar setNewUser={this.setNewUser} id={match.params.id} />
                </Guard>} />

              <Route path='/CalendarList' render={(props) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <CalendarsContainer setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route exact path='/Calendar/:id/EditCalendar' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <EditCalendar id={match.params.id} />
                </Guard>} />

              <Route path='/CreateCalendar' render={({ props }) =>
                <Guard condition={this.state.currentUser} redirectTo='/Login'>
                  <CreateCalendar />
                </Guard>} />
              <Route path='/Calendar/:id/AddShifts' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                  <ShiftSelection id={match.params.id} />
                </Guard>} />

              <Route exact path='/Calendar/:id/Type/:type' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                  <WeekView id={match.params.id} type={match.params.type} />
                </Guard>} />

              <Route path='/Calendar/:id/shifts/:date' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                  <DayView id={match.params.id} date={match.params.date} />
                </Guard>} />

              <Route path='/Calendar/:id/UpdateProfile' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                  <UpdateProfile id={match.params.id} />
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
