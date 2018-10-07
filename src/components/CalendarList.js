import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Delete } from 'bloomer'
// import moment from 'moment'

// import { Buton } from 'bloomer'

import api from './api'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: ''
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }

  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(res => res)
  }

  render () {
    let { calendarGroup, type } = this.props
    console.log(type, 'calendar type')
    if (calendarGroup && calendarGroup.length > 0) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (<div className='calendarItem'>
              <Link to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                {calendar.name}
                {/* <Delete type='submit' onClick={e => this.deleteCalendar(e, calendar.id)} /> */}
              </Link>
              <Link to={`/Calendar/${calendar.id}/WeeklyView`}>Week View</Link>
            </div>
            )
          } else {
            return (
              <div className='calendarItem'>
                <Link to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                  {calendar.name}
                  <Delete type='submit' onClick={e => this.deleteCalendar(e, calendar.id)} />
                </Link>
                <Link to={`/Calendar/${calendar.id}/WeeklyView`}>Week View</Link>
              </div>)
          }
        })
      )
    } else {
      return ('')
    }
  }
}

export default CalendarList
