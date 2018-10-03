import React, { Component } from 'react'
// import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import { formatDate, parseDate } from 'react-day-picker/moment'
// import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      from: undefined,
      to: undefined,
      title: '',
      type: ''
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
  timeOfDayStart () {
    const moment = require('moment')
    const startTime = moment().startOf('day')
  }
  handleFromChange (value) {
    this.setState({ from: value })
  }
  handleToChange (value) {
    this.setState({ to: value })
  }
  render () {
    let { from, to } = this.state
    // const modifiers = { start: from, end: to }
    return (<div >
      <label>Calendar Title
        <input className='input' type='text' placeholder='Provide calendar Title' />
      </label>
      <span className='fromDate'>
        <DayPickerInput
          value={from} placeholder='From' format='LL' formatDate={formatDate} parseDate={parseDate} dayPickerProps={{
            numberOfMonths: 2
          }}
          onDayChange={(e) => this.handleFromChange(e)} />
      </span>
      <span className='toDate'>
        <DayPickerInput value={to} placeholder='To' format='LL' formatDate={formatDate} parseDate={parseDate} dayPickerProps={{
          numberOfMonths: 2
        }} onDayChange={(e) => this.handleToChange(e)} />
      </span>
      <div>Shift Times
        <div>
          <div>Start Time
            <select id='selector' placeholder='hours'>
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
            <select id='selector' placeholder='minutes'>
              <option value='00'>00</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='45'>45</option>
            </select>
            <select id='selector' placeholder='AM/PM'>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </div>
          <div>Stop Time
            <select id='selector' placeholder='hours'>
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
            <select id='selector' placeholder='minutes'>
              <option value='00'>00</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='45'>45</option>
            </select>
            <select id='selector' placeholder='AM/PM'>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </div>
          Shift Number
        </div>
      </div>
    </div>)
  }
}
export default CreateCalendar
