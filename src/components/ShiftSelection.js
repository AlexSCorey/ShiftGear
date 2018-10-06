import React, { Component } from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import 'react-day-picker/lib/style.css'
import { Button, Label, Input } from 'bloomer'

import { Link } from 'react-router-dom'
// import { getActiveModifiers } from 'bloomer/lib/bulma'

import api from './api'

class ShiftSelection extends Component {
  constructor () {
    super()
    this.state = {
      toDate: '',
      fromDate: '',
      toHour: '',
      fromHour: '',
      toMin: '',
      fromMin: '',
      staffRequired: undefined,
      published: false
    }
    this.setFromAmPm = this.setFromAmPm.bind(this)
  }
  configureDate (e) {
    e.preventDefault()
    const { toHour, fromHour, toMin, fromMin } = this.state
    let startMoment = moment(this.state.fromDate).hour(fromHour).minute(fromMin)
    let endMoment = moment(this.state.toDate).hour(toHour).minute(toMin)
    this.createShift(startMoment.format(), endMoment.format())
  }
  createShift (startMoment, endMoment) {
    let calendarId = this.props.id
    let { staffRequired, published } = this.state
    api.createShift(startMoment, endMoment, calendarId, staffRequired, published)
      .then(res => console.log(res, 'res in shift selector'))
  }
  // setSetState (key, value) {
  //   this.setState[key] = value
  // }
  handleFromDateChange (day) {
    this.setState({ fromDate: day })
  }
  handleToDateChange (value) {
    this.setState({ toDate: value })
  }
  setFromHour (value) {
    this.setState({ fromHour: value })
  }
  setFromMinute (value) {
    this.setState({ fromMin: value })
  }
  setFromAmPm (value) {
    if (value === 'PM') {
      let stringify = parseInt(this.state.fromHour, 10) + 12
      this.setState({ fromHour: stringify })
    }
  }
  setToHour (value) {
    this.setState({ toHour: value })
  }
  setToMinute (value) {
    this.setState({ toMin: value })
  }
  setToAmPm (value) {
    if (value === 'PM') {
      let stringify = parseInt(this.state.toHour, 10) + 12
      this.setState({ toHour: stringify })
    }
  }
  readyToPublish () {
    this.setState(prevState => ({
      published: !prevState.publish
    }))
  }
  staffRequired (value) {
    this.setState({ staffRequired: value })
  }
  render () {
    // const { staffRequired } = this.state
    // const { toHour, fromHour, toDate, fromDate, toMin, fromMin, toAmPm, fromAmPm } = this.state
    return (
      <div>
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
                <option>--Select--</option>
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
                <option>--Select--</option>
                <option value='00'>00</option>
                <option value='15'>15</option>
                <option value='30'>30</option>
                <option value='45'>45</option>
              </select>
              <select onChange={(e) => this.setFromAmPm(e.target.value)}>
                <option placeholder='AM/PM' >--Select--</option>
                <option value='AM' className='timeSelector'>AM</option>
                <option value='PM' className='timeSelector'>PM</option>
              </select>
            </div>
            <div>Stop Time
              <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setToHour(e.target.value)}>
                <option>--Select--</option>
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
                <option>--Select--</option>
                <option value='00'>00</option>
                <option value='15'>15</option>
                <option value='30'>30</option>
                <option value='45'>45</option>
              </select>
              <select className='timeSelector' placeholder='AM/PM' onChange={(e) => this.setToAmPm(e.target.value)}>
                <option>--Select--</option>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
              <Label>Done<input type='checkbox' placeholder='Publish?' onChange={(e) => this.readyToPublish(e)} /></Label>
              <Label>Staff Requied
                <Input type='number' name='quantity' min='1' onChange={(e) => this.staffRequired(e.target.value)} />
              </Label>
            </div>
          </div>
          <Button><Link to='/CalendarList' onClick={e => this.configureDate(e)}>Save Shift</Link></Button>
          <Button><Link to='/Calendar/:id/AddEmployee'>Add Employees</Link></Button>
        </div>
      </div>)
  }
}
export default ShiftSelection
