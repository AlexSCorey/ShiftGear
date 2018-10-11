import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Delete } from 'bloomer'
import moment from 'moment'
// import { confirmAlert } from 'react-confirm-alert'
// import 'react-confirm-alert/src/react-confirm-alert.css'
// import moment from 'moment'

import api from './api'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: '',
      myShifts: {},
      loaded: false
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
    // this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount () {
    this.getMySchedule()
  }
  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(res => res)
  }

  getMySchedule () {
    let startDate = moment(new Date()).startOf('week').format('YYYY-MM-DD')
    let endDate = moment(new Date()).add(6, 'days').startOf('week').format('YYYY-MM-DD')
    console.log(startDate, endDate, 'here')
    api.getMySchedule(startDate, endDate)
      .then(res => {
        console.log(res)
        this.setState({ myShifts: res,
          loaded: true })
      })
  }

  render () {
    let { calendarGroup, type } = this.props
    let { myShifts, loaded } = this.state
    if (loaded) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (
              <div>
                <Button>Update Profile<Link to={`Calendar/UpdateProfile`} /></Button>
                <div className='calendarItem'>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`} key={calendar.id}>
                    {calendar.name}
                  </Link>
                </div>
                <div>Your Scheduled
                  <div>{myShifts.map((shift) =>
                    <div>
                      <div>{shift.calendar_name}</div>
                    </div>
                  )}</div>
                </div>
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
    } else {
      return (<div>Loading</div>)
    }
  }
}

export default CalendarList
