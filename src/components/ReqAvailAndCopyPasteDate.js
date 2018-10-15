import React, { Component } from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Link } from 'react-router-dom'

import api from './api'

class ReqAvailAndCopyPasteDate extends Component {
  constructor () {
    super()
    this.state = {
      thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      nextWeek: moment(this.thisWeek).add(6, 'days').startOf('week').format('YYYY-MM-DD'),
      copyWeekStart: undefined,
      shifts: [],
      loaded: false
    }
  }
  componentDidMount () {
    // this.getShifts()
  }
  // getShifts () {
  //   const { id } = this.props
  //   const { thisWeek, nextWeek } = this.state
  //   api.getWeekShiftInfo(id, thisWeek, nextWeek)
  //     .then(res => {
  //       console.log(res, 'res in req avail')
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  copyWeekStart (date) {
    let copyWeekStart = moment(date).format('YYYY-MM-DD')
    this.props.copyWeekStart(copyWeekStart)
  }
  pasteWeek (e) {
    this.props.pasteWeek()
  }
  requestAvailability (e) {
    e.preventDefault()
    let { id } = this.props
    let { thisWeek, nextWeek } = this.state
    api.requestAvailability(id, thisWeek, nextWeek)
      .then(res => {
        return (res)
      })
  }
  assignShifts (value) {
    let { id } = this.props
    api.assignShifts(id, value)
      .then(res => res)
  }
  render () {
    // let { loaded, shifts } = this.state
    let { id, loaded, shifts } = this.props
    if (loaded) {
      if ((shifts.roles.indexOf('owner') > -1) || (shifts.roles.indexOf('manager') > -1)) {
        if (shifts.availability_processes && shifts.availability_processes.length >= 1) {
          return (<div>
            {shifts.availability_processes.map((availabilityProcess) =>
              <div className='requestOffAndCopy' key={availabilityProcess.id}>
                <button className='navButtons' value={availabilityProcess.id} onClick={(e) => this.assignShifts(e.target.value)}>Assign Shifts</button>
                <Link to={`/Calendar/${id}/AddStaff`}><button className='navButtons' >Add Staff</button></Link>
                <Link to={`/Calendar/${id}/AddShifts`}><button className='navButtons' >Add Shift</button></Link>
                <span className='datePicker'>
                  <button className='navButtons' onClick={e => this.pasteWeek(e)}>Copy to:</button>
                  <DayPickerInput className='date' onDayChange={(day) => this.copyWeekStart(day)} />
                </span>
              </div>)}
          </div>)
        } else {
          return (
            <div>
              <div className='requestOffAndCopy'>
                <button className='navButtons' onClick={e => this.requestAvailability(e)}>Request Availability</button>
                <Link to={`/Calendar/${id}/AddStaff`}><button className='navButtons' >Add Staff</button></Link>
                <Link to={`/Calendar/${id}/AddShifts`}><button className='navButtons' >Add Shift</button></Link>
                <span className='datePicker'>
                  <button className='navButtons' onClick={e => this.pasteWeek(e)}>Copy to:</button>
                  <DayPickerInput className='date' onDayChange={(day) => this.copyWeekStart(day)} />
                </span>
              </div>
            </div>)
        }
      } else {
        return (<div class='loader'>
          <div class='line' />
          <div class='line' />
          <div class='line' />
          <div class='line' />
        </div>)
      }
    } else {
      return (<div class='loader'>
        <div class='line' />
        <div class='line' />
        <div class='line' />
        <div class='line' />
      </div>)
    }
  }
}
export default ReqAvailAndCopyPasteDate
