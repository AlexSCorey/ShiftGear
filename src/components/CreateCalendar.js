import React, { Component } from 'react'

import 'react-day-picker/lib/style.css'
import { Link } from 'react-router-dom'
import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      timeZone: 'Eastern Time',
      dlst: false,
      newCalendarId: '',
      msg: ''
    }
  }

  submitCalendar (e) {
    let { title, timeZone, dlts } = this.state
    let { id } = this.props
    e.preventDefault()
    if (id) {
      api.editCalendar(id, title, timeZone,
        dlts)
        .then(res => window.alert('Calendar Successfully Updated'))
    } else {
      api.createNewCalendar(title, timeZone)
        .then(res => {
          this.setState({ newCalendarId: res.id })
        })
    }
  }
  setTimeZone (e, value) {
    e.preventDefault()
    this.setState({ timeZone: value })
  }
  render () {
    let { newCalendarId } = this.state
    // let { id } = this.props
    if (newCalendarId) {
      return (<div className='calendarItem'>
        <label className='itemList1'>Create a New Calendar<input className='formInput' type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })} />
        </label>
        <div className='calendarItem'>
          <label className='itemList1'>Time Zone<br /><div>
            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setTimeZone(e, e.target.value)}>
              <option className='selector'>--Select--</option>
              <option value='Eastern Time (US & Canada)'>Eastern Time (US & Canada)</option>
              <option value='Alaska'>Alaska</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Mountain Time (US & Canada)'>Mountain Time (US & Canada)</option>
              <option value='Central Time (US & Canada)'>Central Time (US & Canada)</option>
            </select>
          </div>
          </label><br />
          <label className='itemList1'>Daylight Savings Time</label>
          <input className='checkbox' type='checkbox' onChange={e => this.setState({ dlts: true })} />
          <div>
            <button className='titleButton' to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Update Calendar</button>
          </div>
          <Link to={`/Calendar/${newCalendarId}/AddEmployee`}>Next Step</Link>
        </div>
        {/* <Link to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link> */}
      </div>)
    } else {
      return (<div className='calendarItem'>
        <label className='itemList1'>Create a New Calendar<input className='formInput' type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })} />
        </label>
        <div>
          <div className='itemList1'>
            <label className='itemList1'>Time Zone<br /><div>
              <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setTimeZone(e, e.target.value)}>
                <option className='selector'>--Select--</option>
                <option value='Eastern Time (US & Canada)'>Eastern Time (US & Canada)</option>
                <option value='Alaska'>Alaska</option>
                <option value='Hawaii'>Hawaii</option>
                <option value='Mountain Time (US & Canada)'>Mountain Time (US & Canada)</option>
                <option value='Central Time (US & Canada)'>Central Time (US & Canada)</option>
              </select>
            </div>
            </label></div><br />
          <label className='itemList1'>Daylight Savings Time</label>
          <input className='checkbox' type='checkbox' onChange={e => this.setState({ dlts: true })} />
          <div>
            <button className='titleButton' to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Create Calendar</button>
          </div>
          {/* <Link className='itemList' to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link> */}
        </div>
        {/* <Link className='itemList' to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link> */}
      </div>)
    }
  }
}
export default CreateCalendar
