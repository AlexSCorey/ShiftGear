import React, { Component } from 'react'
import moment from 'moment'
// import { Label, Input, Notification, Button } from 'bloomer'

// import { NavLink } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      shifts: []
    }
  }
  componentDidMount () {
    let date = moment('2018-10-05T08:00:00.000Z')
    console.log(date._d, 'date')
    this.getShifts()
  }
  getShifts () {
    const { id } = this.props
    api.getShifts(id)
      .then(res => {
        this.setState({ shifts: res.shifts })
      })
  }
  render () {
    const { shifts } = this.state
    // return (

    if (shifts) {
      return (
        <div>
          {console.log(shifts, 'shifts')}
          {/* {console.log(new Date(Date.UTC('2018-10-05T08:00:00.000Z').toUTCString()))} */}
          {this.state.shifts.map((shift) => <div key={shift.shift_id}>
            <div>Start: {moment(shift.start_time).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}</div>
            <div>End: {moment(shift.end).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}</div>
          </div>)}
        </div>
      )
    } else {
      return (<div>something went wrong</div>)
    }
  }
}

export default WeekView
