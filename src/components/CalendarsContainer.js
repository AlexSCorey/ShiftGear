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
  }
  getCalendars () {
    console.log('getCalendars')
    api.getCalendars()
      .then(calendars => {
        console.log('getCalendars calendars', calendars)
        this.setState({ calendars: calendars })
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
          <Link to='/CreateCalendar'>Add Calendar</Link>
          { calendarTypes.map((calendarType) => {
            console.log(calendarType, 'calTypes')
            let calendarGroup = calendars[calendarType]
            if (calendarGroup.length > 0) {
              return (
                <div>
                  <h1>{calendarNames[calendarType]}</h1>
                  <CalendarList key={calendarType} type={calendarNames[calendarType]} calendarGroup={calendarGroup} />
                </div>
              )
            } else {
              return ('')
            }
          }) }
        </div>
      )
      // for each key in keys
      //
      // return (
      //   <div><Link to='/CreateCalendar'>Add Calendar</Link>
      //     <h2>Managed Calendars</h2>
      //     {managed_calendars && managed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
      //     <h2>Owned Calendars</h2>
      //     {owned_calendars && owned_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
      //     {employed_calendars && employed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
      //   </div>)
    } else {
      return ('loading')
    }
  }
}

export default CalendarsContainer
