import React, { Component } from 'react'
import moment from 'moment'
import 'react-day-picker/lib/style.css'

import api from './api'
import WeekView from './WeekView'
import AcceptShiftRequest from './AcceptShiftRequest'
import ReqAvailandCopyPateDate from './ReqAvailAndCopyPasteDate'

class WeekViewContainer extends Component {
  constructor () {
    super()
    this.state = {
      // AcceptShiftSwap
      shiftSwapsIndex: {},
      shiftSwapIndexLoaded: false,
      loaded: false,
      // ReqAvailandCopyPasteDate
      thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      nextWeek: moment(this.thisWeek).add(6, 'days').startOf('week').format('YYYY-MM-DD'),
      lastWeek: moment(this.thisWeek).subtract(7, 'days').startOf('week').format('YYYY-MM-DD'),
      copyWeekStart: undefined,
      shifts: [],
      // WeekView
      notesExist: false
    }
    this.getShiftSwapIndex = this.getShiftSwapIndex.bind(this)
    this.getShifts = this.getShifts.bind(this)
    this.copyWeekStart = this.copyWeekStart.bind(this)
    this.goToThisWeek = this.goToThisWeek.bind(this)
    this.lastWeek = this.lastWeek.bind(this)
    this.nextWeek = this.nextWeek.bind(this)
  }
  componentDidMount () {
    this.getShiftSwapIndex()
    this.getShifts()
  }
  getShiftSwapIndex () {
    let { id } = this.props
    api.getShiftSwapIndex(id)
      .then(res => {
        this.setState({ shiftSwapsIndex: res,
          shiftSwapIndexLoaded: true })
      })
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
  copyWeekStart (date) {
    let copyWeekStart = moment(date).format('YYYY-MM-DD')
    this.setState({ copyWeekStart: copyWeekStart })
  }
  // Week View
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
        this.setState({ shifts: res,
          loaded: true })
      })
  }
  lastWeek () {
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
  nextWeek () {
    // e.preventDefault()
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
  // getNextWeekShifts () {
  //   const { id } = this.props
  //   const { thisWeek, nextWeek } = this.state
  //   let startDate = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
  //   let endDate = moment(nextWeek).add(1, 'week').format('YYYY-MM-DD')
  //   this.setState({ loaded: false })
  //   api.getWeekShiftInfo(id, startDate, endDate)
  //     .then(res => {
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  // getLastWeekShifts () {
  //   const { id } = this.props
  //   const { thisWeek, nextWeek } = this.state
  //   let startDate = moment(thisWeek).add(1, 'week').format('YYYY-MM-DD')
  //   let endDate = moment(nextWeek).add(1, 'week').format('YYYY-MM-DD')
  //   this.setState({ loaded: false })
  //   api.getWeekShiftInfo(id, startDate, endDate)
  //     .then(res => {
  //       this.setState({ shifts: res,
  //         loaded: true })
  //     })
  // }
  render () {
    let { thisWeek, nextWeek, lastWeek, shiftSwapIndexLoaded, shifts, copyWeekStart, notesExist, shiftSwapsIndex, loaded } = this.state
    let { id } = this.props
    console.log(id, 'id in weekview container')
    return (<div>
      <WeekView goToThisWeek={this.goToThisWeek} lastWeek={this.lastWeek} nextWeek={this.nextWeek} thisWeekState={thisWeek} id={id} loaded={loaded} shiftsState={shifts} nextWeekState={nextWeek} lastWeekState={lastWeek} shifts={shifts} copyWeekStartState={copyWeekStart} notesExist={notesExist} shiftSwapsIndex={shiftSwapsIndex} />
      <ReqAvailandCopyPateDate getShifts={this.getShifts} copyWeekStart={this.copyWeekStart} thisWeekState={thisWeek} id={id} loaded={loaded} shiftsState={shifts} nextWeekState={nextWeek} lastWeekState={lastWeek} shifts={shifts} copyWeekStartState={copyWeekStart} notesExist={notesExist} shiftSwapsIndex={shiftSwapsIndex} />
      <AcceptShiftRequest getShiftSwapIndex={this.getShiftSwapIndex} thisWeekState={thisWeek} loaded={loaded} shiftsState={shifts} id={id} nextWeekState={nextWeek} lastWeekState={lastWeek} shifts={shifts} copyWeekStartState={copyWeekStart} shiftSwapIndexLoaded={shiftSwapIndexLoaded} notesExist={notesExist} shiftSwapsIndex={shiftSwapsIndex} />
    </div>)
  }
}

export default WeekViewContainer
