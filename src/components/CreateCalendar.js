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
    }
    api.createNewCalendar(title, timeZone)
      .then(res => {
        this.setState({ newCalendarId: res.id,
          msg: 'You Have Successfully Created A Calendar' })
      })
  }
  setTimeZone (e, value) {
    e.preventDefault()
    this.setState({ timeZone: value })
  }
  render () {
    let { newCalendarId, msg } = this.state
    let { id } = this.props
    if (this.state.msg) {
      return (<div>Alert:`${msg}` </div>)
    } else if (id) {
      return (<div className='enclosingDiv'>
        <div className='calendarItem'>
          <label className='itemList1'><strong>Create a New Calendar</strong><br /><input className='formInput2' type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })} />
          </label>
          <div>
            <label className='itemList1'>Daylight Savings Time</label>
            <input className='checkbox' type='checkbox' onChange={e => this.setState({ dlts: true })} /><br />

            <label className='itemList1'>Time Zone<div>
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

            <div><button className='titleButton' to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Update Calendar</button>
            </div>
            {/* <Link to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link> */}
          </div>
          {/* <Link to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link> */}
        </div>
      </div>)
    } else {
      return (<div className='enclosingDiv'>
        <div className='calendarItem'>
          <label className='itemList1'><strong>Create a New Calendar</strong><br /><input className='formInput2' type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })} />
          </label>
          <div>
            <label className='itemList1'>Daylight Savings Time</label>
            <input className='checkbox' type='checkbox' onChange={e => this.setState({ dlts: true })} /><br />

            <label className='itemList1'>Time Zone<div>
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

            <div> <button className='titleButton' to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Create Calendar</button>
            </div>
            {/* <Link className='itemList' to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link> */}
          </div>
          {/* <Link className='itemList' to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link> */}
        </div>
      </div>)
    }
  }
}
export default CreateCalendar
