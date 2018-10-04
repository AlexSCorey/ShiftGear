import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './api'
import update from 'immutability-helper'
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

    this.editCalendar = this.editCalendar.bind(this)
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }
  componentDidMount () {
    this.getCalendars()
  }
  getCalendars () {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars })
    })
  }
  editCalendar (calendar) {
    this.setState(state => {
      return update(state, {
        calendar: { isEditing: true }
      })
    }, () => {
      api.updateCalendar(this.state.calendar)
    })
  }

  deleteCalendar (calendar) {
    this.setState({
      isDeleting: true
    })
  }
  render () {
    const { calendars } = this.state
    if (calendars) {
      const { managed_calendars, owned_calendars, employed_calendars } = calendars
      return (<div><Link to='/CreateCalendar'>Add Calendar</Link>
        <h2>Managed Calendars</h2>
        {managed_calendars && managed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
        <h2>Owned Calendars</h2>
        {owned_calendars && owned_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
        <h2>Employed Calendars</h2>
        {employed_calendars && employed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
      </div>)
    } else {
      return ('')
    }
  }
}

export default CalendarsContainer
