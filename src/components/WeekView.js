import React, { Component } from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Link } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      shifts: [],
      thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      nextWeek: moment(this.thisWeek).add(6, 'days').startOf('week').format('YYYY-MM-DD'),
      lastWeek: moment(this.thisWeek).subtract(7, 'days').startOf('week').format('YYYY-MM-DD'),
      copyWeekStart: undefined,
      notesExist: false,
      shiftSwapsIndex: [],
      loaded: false

    }
  }
  approvetShiftSwap (e, value) {
    let { token } = this.props
    e.preventDefault()
    api.approveRequest(value, token)
  }
  componentDidMount () {
    this.getShifts()
  }
  copyWeekStart (date) {
    let copyWeekStart = moment(date).format('YYYY-MM-DD')
    this.setState({ copyWeekStart: copyWeekStart })
  }
  pasteWeek (e) {
    const { id } = this.props
    let { copyWeekStart, thisWeek } = this.state
    let startWeek = moment(thisWeek).format('YYYY-MM-DD')
    let endWeek = moment(startWeek).add(6, 'days').format('YYYY-MM-DD')
    api.copyPasteWeek(id, startWeek, endWeek, copyWeekStart)
      .then(window.alert(`You successfully copied this week to ${copyWeekStart}`))
  }
  getShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
      .then(res => {
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  getNextWeekShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    let startDate = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
    let endDate = moment(nextWeek).add(1, 'week').format('YYYY-MM-DD')
    this.setState({ loaded: false })
    api.getWeekShiftInfo(id, startDate, endDate)
      .then(res => {
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  getLastWeekShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    let startDate = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
    let endDate = moment(nextWeek).add(1, 'week').format('YYYY-MM-DD')
    this.setState({ loaded: false })
    api.getWeekShiftInfo(id, startDate, endDate)
      .then(res => {
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  nextWeek (e) {
    e.preventDefault()
    const { id } = this.props
    let lastWeek = moment(this.state.lastWeek).add(1, 'week').format('YYYY-MM-DD')
    let thisWeek = moment(this.state.thisWeek).add(1, 'week').format('YYYY-MM-DD')
    let nextWeek = moment(this.state.nextWeek).add(1, 'week').format('YYYY-MM-DD')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
    this.setState({ loaded: false })
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
      .then(res => {
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  lastWeek (e) {
    e.preventDefault()
    const { id } = this.props
    let lastWeek = moment(this.state.lastWeek).subtract(1, 'week').format('YYYY-MM-DD')
    let thisWeek = moment(this.state.thisWeek).subtract(1, 'week').format('YYYY-MM-DD')
    let nextWeek = moment(this.state.nextWeek).subtract(1, 'week').format('YYYY-MM-DD')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
    this.setState({ loaded: false })
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
      .then(res => {
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  goToThisWeek (date) {
    const { id } = this.props
    let thisWeek = moment(date).startOf('week').format('YYYY-MM-DD')
    let nextWeek = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
    let lastWeek = moment(thisWeek).subtract(1, 'week').format('YYYY-MM-DD')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
    this.setState({ loaded: false })
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
      .then(res => {
        console.log(res)
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  deleteShift (e, shiftId) {
    e.preventDefault()
    let { id } = this.props
    api.deleteShift(id, shiftId)
      .then(res => res)
  }
  acceptShiftSwap (e, shiftID) {
    e.preventDefault()
    let { id } = this.props
    api.acceptShiftSwap(id, shiftID)
      .then(res => window.alert('Swap sent for approval by manager'))
  }

  render () {
    const { shifts, thisWeek, loaded } = this.state
    const { id } = this.props
    if (loaded) {
      if ((shifts.roles.indexOf('owner') > -1) || (shifts.roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div className='weekRange'>
              <span><button key={'next'}className='titleButtonToggle' isactive={loaded ? 'true' : 'false'} onClick={(e) => this.lastWeek(e)}>Last Week</button></span>
              <span className='currentDate'>{moment(thisWeek).format('MM/DD/YY')}</span>
              <span><button key={'last'} className='titleButtonToggle' isactive={loaded ? 'true' : 'false'}onClick={(e) => this.nextWeek(e)}>Next Week</button></span>
            </div>
            <div>
            Go to:
              <DayPickerInput className='date' onDayChange={(day) => this.goToThisWeek(day)} /></div>
            <div>
              {shifts.summaries.map((shift) => <div key={shift.Day}>
                <div className='columns3'>
                  <div key={shift.Day}>
                    <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
                      <button className='delete btn'><i className='far fa-edit' onClick={(e) => this.deleteShift(e, shift.shift_id)} /></button>
                      <span className='day'>{moment(shift.Day).format('ddd, Do')}</span>
                      <div type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this calendar?')) this.deleteShift(e, shift.shift_id) }}>
                        <button className='btn'><i className='far fa-trash-alt' /></button></div>
                      <div>
                        <span><div className='column3'>Total<br />Shifts<br /><strong>{shift.total_shifts}</strong></div></span>
                        <span><div className='column3'>Shift<br /> Capacity<br /><strong>{shift.total_capacity}</strong></div></span>
                        <span><div className='column3'>Assigned<br /> Staff<br /><strong>{shift.total_assigned_capacity}</strong></div></span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div className='weekRange'>
              <span><button className='titleButtonToggle' onClick={(e) => this.lastWeek(e)}>Last Week</button></span>
              <span className='currentDate'>{moment(thisWeek).format('MM/DD/YY')}</span>
              <span><button className='titleButtonToggle' onClick={(e) => this.nextWeek(e)}>Next Week</button></span>
            </div>
            <div>
              {shifts.summaries.map((shift) => <div key={shift.Day}>
                {console.log(shift.Day, 'shift id')}
                <button className='columns3'>
                  <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
                    <span className='day'>{moment(shift.Day).format('ddd, Do')}</span>
                    <div>
                      <span><div className='column3'>Total<br />Shifts<br /><strong>{shift.total_shifts}</strong></div></span>
                      <span><div className='column3'>Shift<br /> Capacity<br /><strong>{shift.total_capacity}</strong></div></span>
                      <span><div className='column3'>Assigned<br /> Staff<br /><strong>{shift.total_assigned_capacity}</strong></div></span>
                    </div>
                  </Link>
                </button>
              </div>)}
            </div>
          </div>
        )
      }
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default WeekView
