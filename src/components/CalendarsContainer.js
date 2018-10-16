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
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }
  componentDidMount () {
    this.getCalendars()
  }
  getCalendars () {
    api.getCalendars()
      .then(calendars => {
        this.setState({ calendars: calendars })
      })
  }
  deleteCalendar (id) {
    api.deleteCalendar(id)
      .then(res => {
      })
    let calendars = this.state.calendars
    let ownedCalendars = calendars.owned_calendars
    calendars.owned_calendars = ownedCalendars.filter((calendar) => calendar.id !== id)
    this.setState({ calendars: calendars })
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
      if (calendars.managed_calendars.length > 0 || calendars.owned_calendars.length > 0) {
        return (
          <div key={Math.random() * 3}>
            <div className='listItems'>
              <Link className='title' to={'/CreateCalendar'}><button className='titleButton'>New Calendar</button></Link>
            </div>
            { calendarTypes.map((calendarType) => {
              let calendarGroup = calendars[calendarType]
              if (calendarGroup.length > 0) {
                return (
                  <div>
                    <div key={Math.random() * 3} >
                      <h1 className='titles'>{calendarNames[calendarType]}</h1>
                      <CalendarList deleteCalendar={this.deleteCalendar} key={Math.random() * 3} type={calendarNames[calendarType]} calendarGroup={calendarGroup} />
                    </div>
                  </div>
                )
              } else {
                return ('')
              }
            }) }
          </div>
        )
      } else if (calendars.employed_calendars.length > 0 && calendars.owned_calendars.length === 0 && calendars.managed_calendars.length === 0) {
        console.log('calendars.managed_calendars.length', calendars.managed_calendars.length)
        let calendarGroup = calendars.employed_calendars
        return (
          <div className='listItems'>
            {console.log('calendarGroup', calendarGroup)}
            <div>
              <div key={Math.random() * 3}>
                <div>
                  <h1 className='titles'>{calendarNames.employed_calendars}</h1>
                  <CalendarList deleteCalendar={this.deleteCalendar} key={Math.random() * 3} type={'Employed Calendars'} calendarGroup={calendarGroup} />
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (<div>
          <Link className='title' to={'/CreateCalendar'}><button className='titleButton'>New Calendar</button></Link>
        </div>)
      }
    } else {
      return (<div>
        <Link className='title' to={'/CreateCalendar'}><button className='titleButton'>New Calendar</button></Link>
      </div>)
    }
  }
}

export default CalendarsContainer
