import React, { Component } from 'react'
// import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Button } from 'bloomer'
import { Link } from 'react-router-dom'

import api from './api'

// import { formatDate, parseDate } from 'react-day-picker/moment'
// import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      fromDate: null,
      fromHour: null,
      fromMinute: null,
      fromAmPm: null,
      toDate: null,
      toHour: null,
      toMinute: null,
      toAmPm: null,
      title: '',
      type: '',
      newCalendarId: ''
    }
    this.handleFromDateChange = this.handleFromDateChange.bind(this)
  }
  // componentDidMount () {
  //   this.getCalendar(this.props.id)
  // }
  // getCalendar (id) {
  //   api.getCalendar(id)
  //     .then(calendar => {
  //       this.setState({ calendar })
  //     })
  // }
  // configureTimes () {
  //   let startTime = moment().hour(this.state.fromHour).minute(this.state.fromMinute)
  //   let stopTime = moment().hour(this.state.toHour).minute(this.state.toMinute)
  // }
  handleFromDateChange (day) {
    this.setState({ toDate: day })
    console.log(this.state.fromDate, 'day')
  }
  handleToDateChange (value) {
    this.setState({ toDate: value })
    console.log(this.state, 'state in CreateCalendar')
  }
  setFromHour (value) {
    this.setState({ fromHour: value })
    console.log(this.state, 'state in CreateCalendar')
  }
  setFromMinute (value) {
    this.setState({ fromMinute: value })
  }
  setFromAmPm (value) {
    this.setState({ fromAmPm: value })
  }
  setToHour (value) {
    this.setState({ toHour: value })
    console.log(this.state, 'state in CreateCalendar')
  }
  setToMinute (value) {
    this.setState({ toMinute: value })
  }
  setToAmPm (value) {
    this.setState({ toAmPm: value })
  }
  // addEmployees () {
  //   <Link to='/Calendar/:id/AddEmployee' />
  // }
  submitCalendar (e) {
    e.preventDefault()
    api.createNewCalendar()
      .then(res => {
        let id = res.calendar.id
        this.setState({ newCalendarId: id })
          .then(this.addEmployees())
      })
  }
  render () {
    // let { fromDate, toDate } = this.state
    // const modifiers = { start: from, end: to }
    return (<div >
      <label>Calendar Title
        <input className='input' type='text' placeholder='Provide calendar Title' />
      </label>
      <span className='datePicker'>
        <DayPickerInput onDayChange={(day) => this.handleFromDateChange(day, 'fromdate')} />
      </span>
      <span className='datePicker'>
        <DayPickerInput onDayChange={(day) => this.handleToDateChange(day)} />
      </span>
      <div>Shift Times
        <div>
          <div>Start Time

            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setFromHour(e.target.value)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </select>

            <select className='timeSelector' placeholder='minutes' onBlur={(e) => this.setFromMinute(e.target.value)}>

              <option value='00'>00</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='45'>45</option>
            </select>

            <select className='timeSelector' placeholder='AM/PM'onBlur={(e) => this.setFromAmPm(e.target.value)}>

              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </div>
          <div>Stop Time

            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setToHour(e.target.value)}>

              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
            </select>

            <select className='timeSelector' placeholder='minutes' onBlur={(e) => this.setToMinute(e.target.value)}>

              <option value='00'>00</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='45'>45</option>
            </select>

            <select className='timeSelector' placeholder='AM/PM' onBlur={(e) => this.setToAmPm(e.target.value)}>

              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </div>
          Shift Number
        </div>
        <div>
          <Button to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Submit Calendar</Button>
        </div>
        <Link to='/Calendar/:id/AddEmployee'>Add Employees</Link>
      </div>
    </div>)
  }
}
export default CreateCalendar
