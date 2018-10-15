import React, { Component } from 'react'
import moment from 'moment'
import api from './api'
import { Button } from 'bloomer'

class MyShifts extends Component {
  constructor () {
    super()
    this.state = {
      myShifts: {},
      loaded: false
    }
  }
  componentDidMount () {
    this.getMySchedule()
  }
  getMySchedule () {
    api.getMySchedule()
      .then(res => {
        this.setState({ myShifts: res,
          loaded: true })
      })
  }
  requestSwap (e, value) {
    let { id } = this.props
    api.requestSwap(id, value)
      .then(res => res)
  }
  render () {
    let { loaded, myShifts } = this.state
    if (loaded) {
      return (<div>
        <div className='titles'>Your Schedule<div>{myShifts.map((shift) =>
          <div className='itemList3' key={shift.shift_id}>
            <div><strong>{shift.calendar_name}</strong></div>
            <div>{moment(shift.start_time).utcOffset(shift.start_time).format('MMM Do h:mma')}-{moment(shift.end_time).utcOffset(shift.end_time).format('MMM Do h:mma')}</div>
            <Button value={shift.shift_id} onClick={e => this.requestSwap(e, e.target.value)}>Request Swap</Button>
          </div>
        )}</div>
        </div></div>)
    } else if (loaded && myShifts.length === 0) {
      return (<div>You are not working this week!</div>)
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
export default MyShifts
