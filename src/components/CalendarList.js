import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bloomer'
// import { confirmAlert } from 'react-confirm-alert'
// import 'react-confirm-alert/src/react-confirm-alert.css'
// import moment from 'moment'

import api from './api'
// import MyShifts from './MyShifts'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: '',
      assignedUsers: [],
      unassignedUsers: [],
      roles: {},
      loaded: false
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
    // this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount () {
    this.getStaff()
  }
  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(res => res)
  }

  getStaff () {
    let { id, shiftsId } = this.props
    api.getStaff(id, shiftsId)
      .then(res => {
        this.setState({ assignedUsers: res.assigned_users,
          unassignedUsers: res.unassigned_users,
          roles: res.roles,
          loaded: true })
      })
  }

  render () {
    let { calendarGroup, type } = this.props
    let { assignedUsers } = this.state
    if (calendarGroup && calendarGroup.length > 0) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (
              <div>
                <div className='calendarItem'>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`} key={calendar.id}>
                    {calendar.name}
                  </Link>
                </div>
                <div>{assignedUsers.map((user) =>
                  <div>
                    <Button onClick={e => this.requestSwap(e)}>Request Swap</Button>
                    <div>{user.name}
                    </div>
                  </div>
                )}</div>
              </div>
            )
          } else {
            return (
              <div>
                <Button>Update Profile<Link to={`Calendar/UpdateProfile`} /></Button>
                <div className='calendarItem'>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                    <button class='btn'><i class='far fa-edit' /></button>
                  </Link>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`}>{calendar.name}</Link>
                  <delete type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this calendar?')) this.deleteCalendar(e, calendar.id) }}>
                    <button class='btn'><i class='far fa-trash-alt' /></button></delete>
                </div>
              </div>)
          }
        }
        ))
    }
  }
}

export default CalendarList
