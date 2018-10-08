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
    console.log(this.props)
  }

  render () {
    let { calendarGroup, type } = this.props
    if (calendarGroup && calendarGroup.length > 0) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (<div className='calendarItem'>
              <Link className='emailLabel' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                {calendar.name}
              </Link>
              <Link className='emailLabel' to={`/Calendar/${calendar.id}/type/${type}`}>Week View</Link>
            </div>
            )
          } else {
            return (
              <div className='calendarItem'>
                <Link className='emailLabel' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                  {calendar.name}
                  <Delete type='submit' onClick={e => this.deleteCalendar(e, calendar.id)} />
                </Link>
                <Link className='emailLabel' to={`/Calendar/${calendar.id}/type/${type}`}>Week View</Link>
                <Button className='is-warning' onClick={this.props.onLogout}>logout</Button>
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
