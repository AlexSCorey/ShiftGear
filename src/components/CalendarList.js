import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Delete, Button } from 'bloomer'
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
            return (<div className='calendarItem'>
              <Link className='emailLabel' key={calendar.id} to={`/Calendar/${calendar.id}/type/${type}`}>{calendar.name}</Link>
            </div>
            )
          } else {
            return (
              <div className='calendarItem'>
                <Link className='emailLabel' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                  Edit
                </Link>
                <Link className='emailLabel' key={calendar.id} to={`/Calendar/${calendar.id}/type/${type}`}>{calendar.name}</Link>
                <Delete type='submit' onClick={e => this.deleteCalendar(e, calendar.id)} />
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
