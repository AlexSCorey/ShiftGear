import React, { Component } from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Link } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thisWeek: this.props.thisWeek,
      nextWeek: this.props.nextWeek,
      lastWeek: this.props.lastWeek,
      shifts: this.props.shifts,
      copyWeekStart: this.props.copyWeekStart,
      notesExist: this.props.notesExist,
      shiftSwapsIndex: this.props.shiftSwapsIndex
      // shifts: [],
      // thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      // nextWeek: moment(this.thisWeek).add(6, 'days').startOf('week').format('YYYY-MM-DD'),
      // lastWeek: moment(this.thisWeek).subtract(7, 'days').startOf('week').format('YYYY-MM-DD'),
      // copyWeekStart: undefined,
      // notesExist: false,
      // shiftSwapsIndex: []

    }
  }
  approvetShiftSwap (e, value) {
    let { token } = this.props
    e.preventDefault()
    api.approveRequest(value, token)
  }
  componentDidMount () {
    // this.getShifts()
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
  // getShifts () {
  //   const { id } = this.props
  //   const { thisWeek, nextWeek } = this.state
  //   api.getWeekShiftInfo(id, thisWeek, nextWeek)
  //     .then(res => {
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
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
  // nextWeek (e) {
  //   e.preventDefault()
  //   const { id } = this.props
  //   let lastWeek = moment(this.state.lastWeek).add(1, 'week').format('YYYY-MM-DD')
  //   let thisWeek = moment(this.state.thisWeek).add(1, 'week').format('YYYY-MM-DD')
  //   let nextWeek = moment(this.state.nextWeek).add(1, 'week').format('YYYY-MM-DD')
  //   this.setState({ nextWeek: nextWeek,
  //     thisWeek: thisWeek,
  //     lastWeek: lastWeek })
  //   this.setState({ loaded: false })
  //   api.getWeekShiftInfo(id, thisWeek, nextWeek)
  //     .then(res => {
  //       console.log(res, 'res in weekview')
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  // lastWeek (e) {
  //   e.preventDefault()
  //   const { id } = this.props
  //   let lastWeek = moment(this.state.lastWeek).subtract(1, 'week').format('YYYY-MM-DD')
  //   let thisWeek = moment(this.state.thisWeek).subtract(1, 'week').format('YYYY-MM-DD')
  //   let nextWeek = moment(this.state.nextWeek).subtract(1, 'week').format('YYYY-MM-DD')
  //   this.setState({ nextWeek: nextWeek,
  //     thisWeek: thisWeek,
  //     lastWeek: lastWeek })
  //   this.setState({ loaded: false })
  //   api.getWeekShiftInfo(id, thisWeek, nextWeek)
  //     .then(res => {
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  // goToThisWeek (date) {
  //   const { id } = this.props
  //   let thisWeek = moment(date).startOf('week').format('YYYY-MM-DD')
  //   let nextWeek = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
  //   let lastWeek = moment(thisWeek).subtract(1, 'week').format('YYYY-MM-DD')
  //   this.setState({ nextWeek: nextWeek,
  //     thisWeek: thisWeek,
  //     lastWeek: lastWeek })
  //   this.setState({ loaded: false })
  //   api.getWeekShiftInfo(id, thisWeek, nextWeek)
  //     .then(res => {
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  lastWeek (e) {
    e.preventDefault()
    this.props.lastWeek()
  }
  nextWeek (e) {
    e.preventDefault()
    this.props.nextWeek()
  }
  acceptShiftSwap (e, shiftID) {
    e.preventDefault()
    let { id } = this.props
    api.acceptShiftSwap(id, shiftID)
      .then(res => window.alert('Swap sent for approval by manager'))
  }
  requestSwap () {
    let { id, shiftsId } = this.props
    api.requestSwap(id, shiftsId)
      .then(res => res, 'requestSwap')
  }
  goToThisWeek (day) {
    this.props.goToThisWeek(day)
  }

  render () {
    const { thisWeek } = this.state
    const { id, loaded, shiftsState, thisWeekState, shifts } = this.props
    if (loaded) {
      if ((shiftsState.roles.indexOf('owner') > -1) || (shiftsState.roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div className='weekRange'>
              <span><button key={'next'}className='titleButtonToggle' isactive={loaded ? 'true' : 'false'} onClick={e => this.lastWeek(e)}>Last Week</button></span>
              <span className='currentDate'>{moment(thisWeekState).format('MM/DD/YY')}</span>
              <span><button key={'last'} className='titleButtonToggle' isactive={loaded ? 'true' : 'false'}onClick={(e) => this.nextWeek(e)}>Next Week</button></span>
            </div>
            <div className='itemList3'><span>
              <strong>Go to:</strong>
              <DayPickerInput className='date' onDayChange={(day) => this.goToThisWeek(day)} /></span></div>
            <div>
              {shiftsState.summaries.map((shift) => <div key={shift.Day}>
                <div>
                  <div key={shift.Day} >
                    <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
                      <div className='day'>{moment(shift.Day).format('ddd, Do')}</div>
                      <button className='columns3'>
                        <div className='column3'>Total<br />Shifts<br /><strong>{shift.total_shifts}</strong></div>
                        <div className='column3'>Shift<br /> Capacity<br /><strong>{shift.total_capacity}</strong></div>
                        <div className='column3'>Assigned<br /> Staff<br /><strong>{shift.total_assigned_capacity}</strong></div>
                      </button>
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
            <div className='itemList3'><span>
              <strong>Go to:</strong>
              <DayPickerInput className='date' onDayChange={(day) => this.goToThisWeek(day)} /></span></div>
            <div>
              {shifts.summaries.map((shift) => <div key={shift.Day}>

                <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
                  <div className='day'>{moment(shift.Day).format('ddd, Do')}</div>
                  <button className='columns3'>
                    <div className='column3'>Total<br />Shifts<br /><strong>{shift.total_shifts}</strong></div>
                    <div className='column3'>Shift<br /> Capacity<br /><strong>{shift.total_capacity}</strong></div>
                    <div className='column3'>Assigned<br /> Staff<br /><strong>{shift.total_assigned_capacity}</strong></div>
                  </button>
                </Link>

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
