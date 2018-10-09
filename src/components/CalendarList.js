import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
// import moment from 'moment'

import api from './api'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: ''
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
    // this.onLogout = this.onLogout.bind(this)
  }

  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(res => res)
  }

  componentDidMount () {
  }

  render () {
    let { calendarGroup, type } = this.props
    if (calendarGroup && calendarGroup.length > 0) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (<div>
              <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`} key={calendar.id}>
                {calendar.name} 
              </Link>
            </div>
            )
          } else {
            return (
              <div className='calendarItem'>
                <Link className='itemList' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                  <button class='btn'><i class='far fa-edit' /></button>
                </Link>
                <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`}>{calendar.name}</Link>
                <delete type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this calendar?')) this.deleteCalendar(e, calendar.id) }}>
                  <button class='btn'><i class='far fa-trash-alt' /></button></delete>
              </div>)
          }
        }
        ))
    }
  }
}

export default CalendarList
