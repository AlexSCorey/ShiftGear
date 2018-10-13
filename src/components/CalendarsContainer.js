import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './api'
import CalendarList from './CalendarList'
import Header from './Header'

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
    api.getCalendars()
      .then(calendars => {
        this.setState({ calendars: calendars })
      })
  }

  render () {
    const { calendars } = this.state
    // const { currentUser } = this.props
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
                      <CalendarList key={calendarGroup.id} type={calendarNames[calendarType]} calendarGroup={calendarGroup} />
                    </div>
                    {/* <div>
                      <div className='center'><Link to={`Calendar/UpdateProfile`}><button className='navButtons'>Update Your Profile</button></Link></div>
                    </div> */}
                  </div>
                )
              } else {
                return ('')
              }
            }) }
          </div>
        )
      } else if (calendars.managed_calendars.length > 0 || calendars.owned_calendars.length > 0) {
        let calendarGroup = calendars[calendarTypes]
        calendarTypes.map((calendarType) => {
          return (
            <div className='listItems'>
              <div>
                <div key={Math.random() * 3}>
                  <div>
                    <Link className='title' to={'/CreateCalendar'}><button className='titleButton'>New Calendar</button></Link>
                    <h1 className='titles'>{calendarNames[calendarType]}</h1>
                    <CalendarList key={Math.random() * 3}type={calendarNames[calendarType]} calendarGroup={calendarGroup} />
                  </div>
                  <div className='center'><Link to={`Calendar/UpdateProfile`}><button className='navButtons'>Update Your Profile</button></Link></div>
                </div>
              </div>
            </div>
          )
        })
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
