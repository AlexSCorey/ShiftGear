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
    this.setState({ copyWeekStart: copyWeekStart })
  }
  pasteWeek (e) {
    let { copyWeekStart } = this.state
    this.props.pasteWeek(copyWeekStart)
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
    let { id, loaded, shifts } = this.props
    if (loaded) {
      if ((shifts.roles.indexOf('owner') > -1) || (shifts.roles.indexOf('manager') > -1)) {
        if (shifts.availability_processes && shifts.availability_processes.length >= 1) {
          return (<div>
            {shifts.availability_processes.map((availabilityProcess) =>
              <div className='requestOffAndCopy' key={availabilityProcess.id}>
                <button className='titleButton' value={availabilityProcess.id} onClick={(e) => this.assignShifts(e.target.value)}>Assign Shifts</button>

                <span><Link to={`/Calendar/${id}/AddStaff`}><button className='requestSwap1' >Add A New User</button></Link>
                  <Link to={`/Calendar/${id}/AddShifts`}><button className='requestSwap2' >Add A Shift</button></Link></span><br />

                <div className='datePicker'>
                  <h1 className='titles'>Copy this schedule</h1>
                  <span>
                    <DayPickerInput className='date' id='timeSelector' placeholder='Select a Date' onDayChange={(day) => this.copyWeekStart(day)} />
                    <button className='requestSwap3' onClick={e => this.pasteWeek(e)}>Copy to <i class='fas fa-arrow-circle-right' /></button>
                  </span>
                </div>
                <div className='whitespace'>&nbsp;</div><div className='whitespace'>&nbsp;</div>
              </div>)}
          </div>)
        } else {
          return (
            <div>
              <div className='requestOffAndCopy'>
                <button className='titleButton' onClick={e => this.requestAvailability(e)}>Request Availability</button><br />

                <span><div><Link to={`/Calendar/${id}/AddStaff`}><button className='requestSwap1'>Add A New User</button></Link>
                  <Link to={`/Calendar/${id}/AddShifts`}><button className='requestSwap2'>Add A Shift</button></Link></div></span><br />

                <div className='datePicker'>
                  <h1 className='titles'>Copy this schedule</h1>
                  <span>
                    <DayPickerInput className='date' id='timeSelector' placeholder='Select a Date' onDayChange={(day) => this.copyWeekStart(day)} />
                    <button className='requestSwap3' onClick={e => this.pasteWeek(e)}>Copy to <i class='fas fa-arrow-circle-right' /></button></span>
                </div>
                <div className='whitespace'>&nbsp;</div><div className='whitespace'>&nbsp;</div>
              </div>
            </div>)
        }
      } else {
        return (<div class='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>)
      }
    } else {
      return (<div class='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>)
    }
  }
}
export default ReqAvailAndCopyPasteDate
