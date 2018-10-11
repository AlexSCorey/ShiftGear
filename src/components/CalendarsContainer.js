import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './api'
import CalendarList from './CalendarList'

class CalendarsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendars: {}
    }
  }
  componentDidMount () {
    this.getCalendars()
    this.getShifts()
  }
  getCalendars () {
    api.getCalendars()
      .then(calendars => {
        this.setState({ calendars: calendars })
      })
  }
  getShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
      .then(res => {
        this.setState(res)
      })
  }

  render () {
    const { calendars } = this.state
    let calendarTypes = Object.keys(calendars)
    if (calendarTypes.length > 0) {
      const calendarNames = {
        managed_calendars: 'Managed Calendars',
        owned_calendars: 'Owned Calendars',
        employed_calendars: 'Employed Calendars'
      }
      return (
        <div>
          <div className='listItems'>
            <Link className='title' to='/CreateCalendar'><button className='titleButton'>New Calendar</button></Link></div>
          { calendarTypes.map((calendarType) => {
            let calendarGroup = calendars[calendarType]
            if (calendarGroup.length > 0) {
              return (
                <div>
                  <h1 className='titles'>{calendarNames[calendarType]}</h1>
                  <CalendarList key={calendarType} type={calendarNames[calendarType]} calendarGroup={calendarGroup} />
                </div>
              )
            } else {
              return ('')
            }
          }) }
        </div>
      )
    } else {
      return ('loading')
    }
  }
}

export default CalendarsContainer
