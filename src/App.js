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
// import EditCalendar from './components/EditCalendar'
import NewUserRegister from './components/NewUserRegister'
import AddEmployeeToCalendar from './components/AddEmployeeToCalendar'
import ShiftSelection from './components/ShiftSelection'
import WeekView from './components/WeekView'
import UpdateProfile from './components/UpdateProfile'
import DayView from './components/DayView'
import RequestPasswordReset from './components/RequestPasswordReset'
import SingleShiftView from './components/SingleShiftView'
import ManagerApproveSwap from './components/ManagerApproveSwap'
import AcceptShiftRequest from './components/AcceptShiftRequest'
import Notes from './components/Notes'
import AvailabilityResponse from './components/AvailabilityRespnse'
import MyShifts from './components/MyShifts'
import ReqAvailAndCopyPasteDate from './components/ReqAvailAndCopyPasteDate'
import Header from './components/Header'
import api from './components/api'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setNewUser = this.setNewUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
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
  onLogout () {
    console.log('hi')
    api.setUserToken(null)
    window.localStorage.clear('token')
    this.setState({ currentUser: false })
  }

  render () {
    if (this.state.currentUser === null || this.state.currentUser === false) {
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
              </div>
            </main>
          </div>
        </Router>
      )
    } else {
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
                <div>
                  <Header onLogout={this.onLogout} />
                  <Route path='/calendars/:id/availability_response/:token' render={({ match }) =>
                    <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                      <AvailabilityResponse id={match.params.id} token={match.params.token} />
                    </Guard>} />

                  <Route path='/welcome/:id' render={({ match }) =>
                    <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                      <NewUserRegister setNewUser={this.setNewUser}
                        id={match.params.id} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/EditCalendar' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <AddEmployeeToCalendar setNewUser={this.setNewUser} id={match.params.id} onLogout={this.onLogout} />
                      <CreateCalendar id={match.params.id} />
                      {/* <EditCalendar id={match.params.id} /> */}
                    </Guard>} />

                  <Route path='/CalendarList' render={(props) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <CalendarsContainer setCurrentUser={this.setCurrentUser} onLogout={this.onLogout} />
                      <MyShifts setCurrentUser={this.setCurrentUser} onLogout={this.onLogout} />
                    </Guard>} />

                  <Route path='/CreateCalendar' render={({ props }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/Login'>
                      <CreateCalendar onLogout={this.onLogout} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/AddShifts/' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <ShiftSelection id={match.params.id} onLogout={this.onLogout} />
                    </Guard>} />

                  <Route path='/Calendar/:id/AddShifts/:shiftID' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <ShiftSelection shiftID={match.params.shiftID} id={match.params.id} />
                    </Guard>} />

                  <Route path='/Calendar/:id/shifts/:date' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <Notes id={match.params.id} date={match.params.date} />
                      <DayView id={match.params.id} date={match.params.date} onLogout={this.onLogout} />
                    </Guard>} />

                  <Route exact path='/Calendar/:id/Type/:type' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <WeekView id={match.params.id} type={match.params.type} />
                      <ReqAvailAndCopyPasteDate id={match.params.id} type={match.params.type} />
                      <AcceptShiftRequest id={match.params.id} type={match.params.type} />
                    </Guard>} />

                  <Route path='/calendars/:id/shifts/:shiftid/usershifts' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <SingleShiftView id={match.params.id} type={match.params.type} shiftsId={match.params.shiftid} />
                    </Guard>} />

                  <Route path='/Calendar/UpdateProfile' render={({ match }) =>
                    <Guard condition={this.state.currentUser} redirectTo='/CalendarList'>
                      <UpdateProfile id={match.params.id} onLogout={this.onLogout} />
                    </Guard>} />

                  <Route path='/RequestPassword' render={(match) =>
                    <Guard condition={!this.state.currentUser} redirectTo='/Login'>
                      <RequestPasswordReset setCurrentUser={this.setCurrentUser} onLogout={this.onLogout} />
                    </Guard>} />

                  <Route path='/complete/:token' render={({ match }) =>
                    <Guard condition={!this.state.currentUser} redirectTo='/CalendarList'>
                      <ManagerApproveSwap token={match.params.id} />
                    </Guard>} />
                </div>
              </div>
            </main>
          </div>
        </Router>
      )
    }
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
