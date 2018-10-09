import React, { Component } from 'react'

import 'react-day-picker/lib/style.css'
import { Button, Input, Label } from 'bloomer'
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
        .then(res => window.alert('Calendar successfully updated'))
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
      return (<div >
        <Label>Calendar Title
          <Input className='input' type='text' placeholder='Provide calendar Title' onChange={e => this.setState({ title: e.target.value })} />
        </Label>
        <div>
          <Label>Time Zone
            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setTimeZone(e, e.target.value)}>
              <option>--Select--</option>
              <option value='Eastern Time (US & Canada)'>Eastern Time (US & Canada)</option>
              <option value='Alaska'>Alaska</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Mountain Time (US & Canada)'>Mountain Time (US & Canada)</option>
              <option value='Central Time (US & Canada)'>Central Time (US & Canada)</option>
            </select>
          </Label>
          <div>
            <Label>Day Light Savings Time</Label>
            <Input type='checkbox' onChange={e => this.setState({ dlts: true })} />
          </div>
          <div>
            <Button to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Update Calendar</Button>
          </div>
          <Link to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link>
        </div>
        <Link to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link>
      </div>)
    } else {
      return (<div >
        <Label>Calendar Title
          <Input className='input' type='text' placeholder='Provide calendar Title' onChange={e => this.setState({ title: e.target.value })} />
        </Label>
        <div>
          <Label>Time Zone
            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setTimeZone(e, e.target.value)}>
              <option>--Select--</option>
              <option value='Eastern Time (US & Canada)'>Eastern Time (US & Canada)</option>
              <option value='Alaska'>Alaska</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Mountain Time (US & Canada)'>Mountain Time (US & Canada)</option>
              <option value='Central Time (US & Canada)'>Central Time (US & Canada)</option>
            </select>
          </Label>
          <div>
            <Label>Day Light Savings Time</Label>
            <Input type='checkbox' onChange={e => this.setState({ dlts: true })} />
          </div>
          <div>
            <Button to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Submit Calendar</Button>
          </div>
          <Link to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link>
        </div>
        <Link to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link>
      </div>)
    }
  }
}
export default CreateCalendar
