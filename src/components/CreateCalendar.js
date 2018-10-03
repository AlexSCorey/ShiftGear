import React, { Component } from 'react'
import moment from 'moment'
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
      <label>Calendar Tite
        <input className='input' type='text' placeholder='Provide calendar Title' />
      </label>
      <label>Calendar Type
        <input className='input' type='text' placeholder='Provide calendar Type' />
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
        <div>Shift Number
          <div>Start Time
            <input type='time' />
          </div>
          <div>Stop Time
            <input type='time' />
          </div>
        </div>
      </div>
    </div>)
  }
}
export default CreateCalendar
