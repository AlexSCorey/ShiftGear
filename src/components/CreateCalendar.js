import React, { Component } from 'react'
// import moment from 'moment'
// import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Button, Input, Label } from 'bloomer'
import { Link } from 'react-router-dom'

import api from './api'

// import { formatDate, parseDate } from 'react-day-picker/moment'
// import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      timeZone: 'Eastern Time',
      dlst: false,
      numberOfShifts: '',
      newCalendarId: '',
      msg: ''
    }
    // this.handleFromDateChange = this.handleFromDateChange.bind(this)
  }

  submitCalendar (e) {
    let { title, timeZone, numberOfShifts } = this.state
    e.preventDefault()
    api.createNewCalendar(title, timeZone, numberOfShifts)
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
    if (this.state.msg) {
      return (<div>Alert:`${msg}` </div>)
    }
    // const modifiers = { start: from, end: to }
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
          <Label>Shift Number</Label>
          <Input type='number' placehold='Number of Shifts' onChange={e => this.setState({ numberOfShifts: e.target.value })} />
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
export default CreateCalendar
