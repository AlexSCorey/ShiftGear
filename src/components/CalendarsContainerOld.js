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
    console.log('here')
    api.getCalendars()
      .then(calendars => {
        this.setState({ calendars: calendars })
      })
  }

  render () {
    const { calendars } = this.state
    // let keys = Object.keys(calendars)
    console.log(calendars, 'calendars in calendar container')
    if (calendars) {
      let keys = Object.keys(calendars)
      console.log(keys[0], 'keys object thing')
      // for each key in keys
      //
      const { managed_calendars, owned_calendars, employed_calendars } = calendars
      return (
        <div><Link to='/CreateCalendar'>Add Calendar</Link>
          <h2>Managed Calendars</h2>
          { Object.keys(calendars).forEach( key => <CalendarList header={key} calendars={Object.key}/>) }
          {managed_calendars && managed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
          <h2>Owned Calendars</h2>
          {owned_calendars && owned_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
          {employed_calendars && employed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
        </div>)
    } else {
      return ('')
    }
  }
}

// render () {
//   const { calendars } = this.state
//   // let keys = Object.keys(calendars)
//   console.log(calendars, 'calendars in calendar container')
//   if (calendars) {
//     let keys = Object.keys(calendars)
//     console.log(keys[0], 'keys object thing')

//     // for each key in keys
//     //
//     const { managed_calendars, owned_calendars, employed_calendars } = calendars
//     return (
//       <div><Link to='/CreateCalendar'>Add Calendar</Link>
//         <h2>Managed Calendars</h2>
//         {managed_calendars && managed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
//         <h2>Owned Calendars</h2>
//         {owned_calendars && owned_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}

//         {employed_calendars && employed_calendars.map((calendar) => <CalendarList editCalendar={this.editCalendar} key={calendar.id} id={calendar.id} name={calendar.name} />)}
//       </div>)
//   } else {
//     return ('')
//   }
// }

export default CalendarsContainer
