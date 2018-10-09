import React, { Component } from 'react'
import moment from 'moment'
import { Label, Input, Button } from 'bloomer'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

// import { Link } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      shifts: [],
      thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      nextWeek: moment(new Date()).add(7, 'days').format('YYYY-MM-DD'),
      lastWeek: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD')
    }
  }
  componentDidMount () {
    this.getShifts()
  }
  getShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    api.getShifts(id, thisWeek, nextWeek)
      .then(res => {
        this.setState({ shifts: res })
      })
  }
  nextWeek (e) {
    e.preventDefault()
    let nextWeek = moment(this.state.lasWeek).add(1, 'week')
    let thisWeek = moment(this.state.thisWeek).add(1, 'week')
    let lastWeek = moment(this.state.nextWeek).add(1, 'week')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
  }
  lastWeek (e) {
    e.preventDefault()
    let nextWeek = moment(this.state.lasWeek).subtract(1, 'week')
    let thisWeek = moment(this.state.thisWeek).subtract(1, 'week')
    let lastWeek = moment(this.state.nextWeek).subtract(1, 'week')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
  }

  render () {
    const { shifts, thisWeek, nextWeek, lastWeek } = this.state
    if (shifts && shifts.length > 0) {
      return (
        <div>
          <Button onClick={(e) => this.lastWeek(e)}>{moment(lastWeek).format('MMM Do YYYY')}</Button>

          <div>{moment(thisWeek).format('MMM Do YYYY')}</div>

          <Button onClick={(e) => this.nextWeek(e)}>{moment(nextWeek).format('MMM Do YYYY')}</Button>

          {shifts.map((shift) => <div key={shift.shift_id}>
            <div>
              <div>{moment(shift.Day).format('ddd, Do')}</div>
              Avail:({shift.total_shifts})
              Stop Time:({shift.total_capacity})
            </div>
            <Label>Note:
            <Input type='textarea' />
            </Label>
          </div>)}
        </div>
      )
      // 0: {Day: "2018-09-30 00:00:00", total_shifts: 2, total_capacity: 6, total_assigned_capacity: "8", published_shifts: 1, …
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default WeekView
