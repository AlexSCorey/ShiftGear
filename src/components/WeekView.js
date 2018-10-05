import React, { Component } from 'react'
// import { Label, Input, Notification, Button } from 'bloomer'

// import { NavLink } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      days: {}
    }
  }
  getDays () {
    const { id } = this.props
    api.getShifts(id)
      .then(res => console.log(res, 'res in weekview'))
  }
  render () {
    // const { days } = this.state
    return (<div>
      {/* {days.map((day) => <div key={day.id}>{day.name})} */}
    </div>)
  }
}
export default WeekView
