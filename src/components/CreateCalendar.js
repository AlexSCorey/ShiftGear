import React, { Component } from 'react'
// import moment from 'moment'
// import DayPickerInput from 'react-day-picker/DayPickerInput'
// import 'react-day-picker/lib/style.css'
import { Button, Label, Input } from 'bloomer'
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
      dailyWorkLimit: '',
      weeklyWorkLimit: '',
      newCalendarId: ''
    }
    // this.handleFromDateChange = this.handleFromDateChange.bind(this)
  }

  submitCalendar (e) {
    let { title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, dlst } = this.state
    e.preventDefault()
    api.createNewCalendar(title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, dlst)
      .then(res => {
        this.setState({ newCalendarId: res.id })
      })
  }
  render () {
    let { title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, newCalendarId } = this.state
    // const modifiers = { start: from, end: to }
    return (<div >
      <label>Calendar Title
        <input className='input' type='text' value={title} placeholder='Provide calendar Title' onChange={e => this.setState({ title: e.target.value })} />
      </label>
      <Label >Daylight Saving's Time</Label>
      <input type='checkbox' onChange={e => this.setState({ dlst: true })} />
      <Label>Time Zone</Label>
      <select>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Eastern Time (US & Canada)'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Hawaii'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Alaska'}</option>
        <option vvalue={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Pacific Time (US & Canada)'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Central Time (US & Canada)'}</option>
      </select >
      <Label>Number of Shifts
        <Input type='number' placeholder='Must Be a Number' value={numberOfShifts} required onChange={e => this.setState({ numberOfShifts: e.target.value })} />
      </Label>
      <Label>Daily Work Limit
        <Input type='number' placeholder='Optional' value={dailyWorkLimit} onChange={e => this.setState({ dailyWorkLimit: e.target.value })} />
      </Label>
      <Label>Weekly Work Limit
        <Input type='number' placeholder='Optional' value={weeklyWorkLimit} onChange={e => this.setState({ weeklyWorkLimit: e.target.value })} />
      </Label>
      <div>
        <Button to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Submit Calendar</Button>
      </div>
      <Link to={`/Calendar/${newCalendarId}/AddShifts`}>Add Shifts</Link>
    </div>)
  }
}
export default CreateCalendar
