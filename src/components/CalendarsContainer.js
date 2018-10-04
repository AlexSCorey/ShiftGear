import React, { Component } from 'react'
import api from './api'
import CalendarList from './CalendarList'

class CalendarsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendars: {},
      owned: undefined,
      managed: undefined,
      employed: undefined
    }
  }
  componentDidMount () {
    this.getCalendars()
  }
  getCalendars () {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars })
    })
  }

  render () {
    const { calendars } = this.state
    if (calendars) {
      const { managed_calendars, owned_calendars, employed_calendars } = calendars
      return (<div>
        {managed_calendars && managed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
        {owned_calendars && owned_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
        {employed_calendars && employed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
      </div>)
    } else {
      return ('')
    }
  }
}

export default CalendarsContainer
