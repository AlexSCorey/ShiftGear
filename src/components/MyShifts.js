import React, { Component } from 'react'
import moment from 'moment'
import api from './api'

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
    let startDate = moment(new Date()).format('YYYY-MM-DD')
    let endDate = moment(new Date()).add(6, 'days').startOf('week').format('YYYY-MM-DD')
    console.log(startDate, endDate, 'here')
    api.getMySchedule(startDate, endDate)
      .then(res => {
        console.log(res)
        this.setState({ myShifts: res,
          loaded: true })
      })
  }
  render () {
    let { loaded, myShifts } = this.state
    if (loaded) {
      return (<div>
        <div>Your Scheduled
          <div>{myShifts.map((shift) =>
            <div>
              <div>{shift.calendar_name}</div>
              <div>{moment(shift.start_time).format('MMM Do h:mma')}-{moment(shift.end_time).format('MMM Do h:mma')}</div>
            </div>
          )}</div>
        </div></div>)
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default MyShifts
