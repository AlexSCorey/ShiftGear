import React, { Component } from 'react'
// import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
// import { Label, Input, Notification, Button } from 'bloomer'

import { Link } from 'react-router-dom'
// import api from './api'

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
      toAmPm: '',
      fromAmPm: ''
    }
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
  // handleFromDateChange (day) {
  //   this.setState({ fromDate: day })
  //   console.log(this.state.fromDate, 'day')
  // }
  // handleToDateChange (value) {
  //   this.setState({ toDate: value })
  //   console.log(this.state, 'state in CreateCalendar')
  // }
  // setFromHour (value) {
  //   this.setState({ fromHour: value })
  //   console.log(this.state, 'state in CreateCalendar')
  // }
  // setFromMinute (value) {
  //   this.setState({ fromMin: value })
  // }
  // setFromAmPm (value) {
  //   this.setState({ fromAmPm: value })
  // }
  // setToHour (value) {
  //   this.setState({ toHour: value })
  //   console.log(this.state, 'state in CreateCalendar')
  // }
  // setToMinute (value) {
  //   this.setState({ toMin: value })
  // }
  // setToAmPm (value) {
  //   this.setState({ toAmPm: value })
  // }
  render () {
    const { toHour, fromHour, toDate, fromDate, toMin, fromMin, toAmPm, fromAmPm } = this.state
    return (<div>
      <span className='datePicker'>
        <DayPickerInput value={fromDate} onBlur={e => this.setState({ fromDate: e.target.value })} />
      </span>
      <span className='datePicker'>
        <DayPickerInput value={toDate} onBlur={e => this.setState({ toDate: e.target.value })} />
      </span>
      <div>Shift Times
        <div>
          <div>Start Time
            <select className='timeSelector' placeholder='hours'>
              <option>--select--</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>1</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>2</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>3</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>4</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>5</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>6</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>7</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>8</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>9</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>10</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>11</option>
              <option value={fromHour} onBlur={e => this.setState({ fromHour: e.target.value })}>12</option>
            </select>

            <select className='timeSelector' placeholder='minutes'>
              <option>--Select--</option>
              <option value={fromMin} onBlur={e => this.setState({ fromMin: e.target.value })}>00</option>
              <option value={fromMin} onBlur={e => this.setState({ fromMin: e.target.value })}>15</option>
              <option value={fromMin} onBlur={e => this.setState({ fromMin: e.target.value })}>30</option>
              <option value={fromMin} onBlur={e => this.setState({ fromMin: e.target.value })}>45</option>
            </select>

            <select className='timeSelector' placeholder='AM/PM'>
              <option>--Select--</option>
              <option value={fromAmPm} onBlur={e => this.setState({ fromAmPm: e.target.value })}>AM</option>
              <option value={fromAmPm} onBlur={e => this.setState({ fromAmPm: e.target.value })}>PM</option>
            </select>
          </div>
          <div>Stop Time
            <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setToHour(e.target.value)}>
              <option>--Select--</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>1</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>2</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>3</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>4</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>5</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>6</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>7</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>8</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>9</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>10</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>11</option>
              <option value={toHour} onBlur={e => this.setState({ toHour: e.target.value })}>12</option>
            </select>
            <select className='timeSelector' placeholder='minutes' onBlur={(e) => this.setToMinute(e.target.value)}>
              <option>--Select--</option>
              <option value={toMin} onBlur={e => this.setState({ toMin: e.target.value })}>00</option>
              <option value={toMin} onBlur={e => this.setState({ toMin: e.target.value })}>15</option>
              <option value={toMin} onBlur={e => this.setState({ toMin: e.target.value })}>30</option>
              <option value={toMin} onBlur={e => this.setState({ toMin: e.target.value })}>45</option>
            </select>
            <select className='timeSelector' placeholder='AM/PM' onBlur={(e) => this.setToAmPm(e.target.value)}>
              <option>--Select--</option>
              <option value={toAmPm} onBlur={e => this.setState({ toAmPm: e.target.value })}>AM</option>
              <option value={toAmPm} onBlur={e => this.setState({ toAmPm: e.target.value })}>PM</option>
            </select>
          </div>
        </div>
        <Link to='/Calendar/:id/AddEmployee'>Add Employees</Link>
      </div>
    </div>)
  }
}
export default ShiftSelection
