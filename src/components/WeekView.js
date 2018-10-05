import React, { Component } from 'react'
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
    //   <div>{console.log(shifts)}</div>)
    if (shifts) {
      return (
        <div>
          {this.state.shifts.map((shift) => <div key={shift.shift_id}>{shift.start_time}</div>)}
        </div>
      )
    } else {
      return (<div>something went wrong</div>)
    }
  }
}

export default WeekView
