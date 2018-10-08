import React, { Component } from 'react'
import moment from 'moment'
import { Delete, Button } from 'bloomer'

import { Link } from 'react-router-dom'

import api from './api'

class WeekView extends Component {
  constructor () {
    super()
    this.state = {
      shifts: [],
      thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
      nextWeek: moment(new Date()).add(6, 'days').format('YYYY-MM-DD'),
      lastWeek: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
      notesExist: false,
      shiftSwapsIndex: []

    }
  }
  componentDidMount () {
    this.getShifts()
    this.getShiftSwapIndex()
  }
  getShifts () {
    const { id } = this.props
    const { thisWeek, nextWeek } = this.state
    api.getWeekShiftInfo(id, thisWeek, nextWeek)
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
    this.getShifts()
  }
  lastWeek (e) {
    e.preventDefault()
    let nextWeek = moment(this.state.lasWeek).subtract(1, 'week')
    let thisWeek = moment(this.state.thisWeek).subtract(1, 'week')
    let lastWeek = moment(this.state.nextWeek).subtract(1, 'week')
    this.setState({ nextWeek: nextWeek,
      thisWeek: thisWeek,
      lastWeek: lastWeek })
    this.getShifts()
  }
  deleteShift (e, shiftId) {
    e.preventDefault()
    let { id } = this.props
    api.deleteShift(id, shiftId)
      .then(res => res)
  }
  getShiftSwapIndex () {
    let { id } = this.props
    api.getShiftSwapIndex(id)
      .then(res => {
        this.setState({ shiftSwapsIndex: res })
      })
  }
  acceptShiftSwap (e, shiftID) {
    e.preventDefault()
    let { id } = this.props
    api.acceptShiftSwap(id, shiftID)
      .then(res => window.alert('Swap sent for approval by manager'))
  }
  render () {
    const { shifts, thisWeek, shiftSwapsIndex } = this.state
    const { id, type } = this.props
    if (shifts && shifts.length > 0) {
      if (type === 'Employed Calendars') {
        return (
          <div>
            <Button onClick={(e) => this.lastWeek(e)}>Last Week</Button>
            <div>{moment(thisWeek).format('MMM Do YYYY')}</div>
            <Button onClick={(e) => this.nextWeek(e)}>Next Week</Button>
            {shifts.map((shift) => <div key={shift.shift_id}>
              <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
                {<div className='weekViewButton'>
                  <div>{moment(shift.Day).format('ddd, Do')}
                    <div>
                      <div>Total Shifts:({shift.total_shifts})</div>
                      <div>Capacity:({shift.total_capacity})</div>
                      <div>Assigned Cap:({shift.total_assigned_capacity})</div>
                    </div>
                  </div>
                </div>}
              </Link>
            </div>)}
          </div>
        )
      } else {
        return (<div>
          <Button onClick={(e) => this.lastWeek(e)}>Last Week</Button>
          <div>{moment(thisWeek).format('MMM Do YYYY')}</div>
          <Button onClick={(e) => this.nextWeek(e)}>Next Week</Button>
          {shifts.map((shift) => <div key={shift.shift_id}>
            <Link to={`/Calendar/${id}/Shifts/${shift.Day}`}>
              { <div className='weekViewButton'>
                <div>{moment(shift.Day).format('ddd, Do')}
                  <div>
                    <div>Total Shifts:({shift.total_shifts})</div>
                    <div>Capacity:({shift.total_capacity})</div>
                    <div>Assigned Cap:({shift.total_assigned_capacity})</div>
                  </div>
                </div>
              </div>}
            </Link>
            <Delete onClick={(e) => this.deleteShift(e, shift.shift_id)} />
          </div>)}
        </div>)
      }
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default WeekView

// import React, { Component } from 'react'
// import moment from 'moment'
// import { Delete, Button } from 'bloomer'

// import { Link } from 'react-router-dom'

// import api from './api'

// class WeekView extends Component {
//   constructor () {
//     super()
//     this.state = {
//       shifts: [],
//       thisWeek: moment(new Date()).startOf('week').format('YYYY-MM-DD'),
//       nextWeek: moment(new Date()).add(6, 'days').format('YYYY-MM-DD'),
//       lastWeek: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
//       notesExist: false
//     }
//   }
//   componentDidMount () {
//     this.getShifts()
//   }
//   getShifts () {
//     const { id } = this.props
//     const { thisWeek, nextWeek } = this.state
//     api.getWeekShiftInfo(id, thisWeek, nextWeek)
//       .then(res => {
//         this.setState({ shifts: res })
//       })
//   }
//   nextWeek (e) {
//     e.preventDefault()
//     let nextWeek = moment(this.state.lasWeek).add(1, 'week')
//     let thisWeek = moment(this.state.thisWeek).add(1, 'week')
//     let lastWeek = moment(this.state.nextWeek).add(1, 'week')
//     this.setState({ nextWeek: nextWeek,
//       thisWeek: thisWeek,
//       lastWeek: lastWeek })
//     this.getShifts()
//   }
//   lastWeek (e) {
//     e.preventDefault()
//     let nextWeek = moment(this.state.lasWeek).subtract(1, 'week')
//     let thisWeek = moment(this.state.thisWeek).subtract(1, 'week')
//     let lastWeek = moment(this.state.nextWeek).subtract(1, 'week')
//     this.setState({ nextWeek: nextWeek,
//       thisWeek: thisWeek,
//       lastWeek: lastWeek })
//     this.getShifts()
//   }
//   deleteShift (e, shiftId) {
//     e.preventDefault()
//     let { id } = this.props
//     api.deleteShift(id, shiftId)
//       .then(res => res)
//   }
//   render () {
//     const { shifts, thisWeek, shiftSwapsIndex } = this.state
//     const { id, type } = this.props
//     if (shifts && shifts.length > 0) {
//       if (type === 'Employed Calendars') {
//         return (
//           <div>
//             <Button onClick={(e) => this.lastWeek(e)}>Last Week</Button>
//             <div>{moment(thisWeek).format('MMM Do YYYY')}</div>
//             <Button onClick={(e) => this.nextWeek(e)}>Next Week</Button>
//             <div>
//               Click on a Shift to Accept It
//               {shiftSwapsIndex.map((shiftSwap) => {
//                 if (shiftSwap.accepting_user) {
//                   return (
//                     <div>
//                       <div key={shiftSwap.id}>
//                         <Button isActive='true' value={shiftSwap.id}
//                           onClick={(e) => { if (window.confirm('Accept this shift?')) this.acceptShiftSwap(e, e.target.value) }}
//                         >{moment(shiftSwap.shift.start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift.end_time).format('MMM Do YYYY hh:mm a')}</Button>
//                       </div>
//                       {shifts.map((shift) => <div key={shift.shift_id}>
//                         <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
//                           {<div className='weekViewButton'>
//                             <div>{moment(shift.Day).format('ddd, Do')}
//                               <div>
//                                 <div>Total Shifts:({shift.total_shifts})</div>
//                                 <div>Capacity:({shift.total_capacity})</div>
//                                 <div>Assigned Cap:({shift.total_assigned_capacity})</div>
//                               </div>
//                             </div>
//                           </div>}
//                         </Link>
//                       </div>)}
//                     </div>
//                   )
//                 } else {
//                   return (
//                     <div>
//                       <div key={shiftSwap.id}>
//                         <Button isActive='false' value={shiftSwap.id}
//                           onClick={(e) => { if (window.confirm('Accept this shift?')) this.acceptShiftSwap(e, e.target.value) }}
//                         >{moment(shiftSwap.shift.start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift.end_time).format('MMM Do YYYY hh:mm a')}</Button>
//                       </div>
//                       {shifts.map((shift) => <div key={shift.shift_id}>
//                         <Link to={`/Calendar/${id}/Shifts/${moment(shift.Day).format('YYYY-MM-DD')}`}>
//                           {<div className='weekViewButton'>
//                             <div>{moment(shift.Day).format('ddd, Do')}
//                               <div>
//                                 <div>Total Shifts:({shift.total_shifts})</div>
//                                 <div>Capacity:({shift.total_capacity})</div>
//                                 <div>Assigned Cap:({shift.total_assigned_capacity})</div>
//                               </div>
//                             </div>
//                           </div>}
//                         </Link>
//                       </div>)}
//                     </div>
//                   )
//                 }
//               })}
//             </div>
//           </div>
//         )
//       } else {
//         return (
//           <div>
//             <Button onClick={(e) => this.lastWeek(e)}>Last Week</Button>
//             <div>{moment(thisWeek).format('MMM Do YYYY')}</div>
//             <Button onClick={(e) => this.nextWeek(e)}>Next Week</Button>
//             {shifts.map((shift) => <div key={shift.shift_id}>
//               <Link to={`/Calendar/${id}/Shifts/${shift.Day}`}>
//                 { <div className='weekViewButton'>
//                   <div>{moment(shift.Day).format('ddd, Do')}
//                     <div>
//                       <div>Total Shifts:({shift.total_shifts})</div>
//                       <div>Capacity:({shift.total_capacity})</div>
//                       <div>Assigned Cap:({shift.total_assigned_capacity})</div>
//                     </div>
//                   </div>
//                 </div>}
//               </Link>
//               <Delete onClick={(e) => this.deleteShift(e, shift.shift_id)} />
//             </div>)}
//           </div>
//         )
//       }
//     } else {
//       return (<div>Loading</div>)
//     }
//   }
// }

// export default WeekView
