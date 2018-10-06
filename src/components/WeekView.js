import React, { Component } from 'react'
import moment from 'moment'
import { Delete, Button } from 'bloomer'

// import { Link } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      shifts: [],
      today: moment(new Date()),
      tomorrow: moment(new Date()).add(1, 'day'),
      yesterday: moment(new Date()).subtract(1, 'day')
    }
  }
  componentDidMount () {
    console.log(moment(new Date()).format('ddd, MM Do YY'))
    this.getShifts()
  }
  getShifts () {
    const { id } = this.props
    api.getShifts(id)
      .then(res => this.setState({ shifts: res.shifts }))
  }
  tomorrow (e) {
    e.preventDefault()
    let tomorrow = moment(this.state.tomorrow).add(1, 'day')
    let today = moment(this.state.today).add(1, 'day')
    let yesterday = moment(this.state.yesterday).add(1, 'day')
    this.setState({ tomorrow: tomorrow,
      today: today,
      yesterday: yesterday })
  }
  yesterday (e) {
    e.preventDefault()
    let tomorrow = moment(this.state.tomorrow).subtract(1, 'day')
    let today = moment(this.state.today).subtract(1, 'day')
    let yesterday = moment(this.state.yesterday).subtract(1, 'day')
    this.setState({ tomorrow: tomorrow,
      today: today,
      yesterday: yesterday })
  }
  deleteShift (e, shiftId) {
    e.preventDefault()
    let { id } = this.props
    api.deleteShift(id, shiftId)
      .then(res => res)
  }

  render () {
    const { shifts, today, tomorrow, yesterday } = this.state
    if (shifts && shifts.length > 0) {
      return (
        shifts.map((shift) => {
          console.log(moment(today, 'year'), 'today')
          console.log((moment(shift.start_time).format('ddd, MM Do YY')), 'is it true')
          console.log(moment(new Date(shift.start_time)).format('ddd, MM Do YY'), 'shift day')
          if (moment(shift.start_time).get('date') === moment().get('date')) {
            return (<div>
              <Button onClick={(e) => this.yesterday(e)}>{moment(yesterday).format('MMM Do YYYY')}</Button>
              <div>{moment(today).format('MMM Do YYYY')}</div>
              <Button onClick={(e) => this.tomorrow(e)}>{moment(tomorrow).format('MMM Do YYYY')}</Button>
              <div>{moment(shift.start_time).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}-{moment(shift.end).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}({shift.capacity})<Delete onClick={(e) => this.deleteShift(e, shift.shift_id)} /></div>
              <div>hi</div>
            </div>)
          } else {
            return (<div>""</div>)
          }
        })
      )
    } else {
      return (<div>you are wrong sucka </div>)
    }
  }
}
//       if (shifts && shifts.length > 0) {
//         return (
//           <div>
//             <Button onClick={(e) => this.yesterday(e)}>{moment(yesterday).format('MMM Do YYYY')}</Button>
//             <div>{moment(today).format('MMM Do YYYY')}</div>
//             <Button onClick={(e) => this.tomorrow(e)}>{moment(tomorrow).format('MMM Do YYYY')}</Button>
//             {shifts.map((shift) => <div key={shift.shift_id}>
//               <div>{moment(shift.start_time).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}-{moment(shift.end).add(4, 'hours').format('ddd, MM Do YY, h:mm a')}({shift.capacity})<Delete onClick={(e) => this.deleteShift(e, shift.shift_id)} /></div>
//             </div>)}
//           </div>
//         )
//       } else {
//         return (<div>something went wrong</div>)
//       }
//     }
//   }
// }
export default WeekView
