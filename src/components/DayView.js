import React, { Component } from 'react'
import { Delete } from 'bloomer'
import moment from 'moment'
import { Link } from 'react-router-dom'

import api from './api'
class DayView extends Component {
  constructor () {
    super()
    this.state = {
      note: '',
      shiftsToday: {},
      users: {},
      shiftsLoaded: false,
      assignedUsers: [],
      unassignedUsers: []
    }
  }
  componentDidMount () {
    this.getShifts()
    this.getNotes()
  }

  getShifts () {
    let { id, date } = this.props
    api.getShiftsForADay(id, date)
      .then(res => {
        this.setState({ shiftsToday: res,
          shiftsLoaded: true })
      })
  }
  getNotes () {
    let { id, date } = this.props
    let today = moment(date).format('YYYY-MM-DD')
    api.getNotes(id, today)
      .then(res => {
        this.setState({ employeeNotes: res,
          alertsLoaded: true })
      })
  }

  deleteShift (e, shiftId) {
    e.preventDefault()
    let { id } = this.props
    api.deleteShift(id, shiftId)
      .then(res => res)
  }
  updateShifts (shiftId, startTime, endTime, capacity, published) {
    let { id } = this.props
    api.updateShifts(id, shiftId, startTime, endTime, capacity, published)
      .then(res => res)
  }
  handleSubmit (e) {
    e.preventDefault()
    const { note } = this.state
    const { id, date } = this.props
    let formattedDate = moment(new Date(date)).format('YYYY-MM-DD')
    api.createNote(note, id, formattedDate)
      .then(res => res)
  }
  render () {
    let { id, date } = this.props
    let { shiftsToday, shiftsLoaded, unassignedUsers } = this.state
    if (shiftsLoaded) {
      if ((shiftsToday.roles.indexOf('owner') > -1) || (shiftsToday.roles.indexOf('manager') > -1)) {
        return (
          <div>
            {shiftsToday.shifts.map((shift) =>
              <div key={shift.shift_id}>
                <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                  <div id={shift.shift_id} className='shiftNode'>
                    <div className='columns3'>
                      <div className='column3'>Capacity<br /><strong>{shift.capacity}</strong></div>
                      <div className='column3'>Start<br /><strong>{moment(shift.start_time).utcOffset(shift.end_time).format('h:mm:a')}</strong></div>
                      <div className='column3'>End<br /><strong>{moment(shift.end_time).utcOffset(shift.end_time).format('h:mm:a')}</strong></div>
                    </div>
                    <Link className='column3'to={`/Calendar/${id}/AddShifts/${shift.shift_id}`}>Edit</Link>
                    <Delete id={shift.shift_id} onClick={e => this.deleteShift(e, shift.shift_id)} />
                  </div>
                </Link>
                <div>
                  <div className='temp'>
                    <div className='itemList1'>Assigned Staff</div>
                    {shift.assigned_users.map((user) =>
                      <div key={user.id}><p className='itemList3'>{user.name}</p></div>)}
                  </div>
                  <div>
                    <div className='itemList1'>Unassigned Staff</div>
                    <div>{unassignedUsers.map((user) =>
                      <div ><p className='itemList3'>{user.name}</p>
                        <hr />
                        <button className='checkbox' type='checkbox' value={user.id} onClick={e => this.assignStaff(e.target.value)}>Assign</button>
                      </div>

                    )}</div>
                  </div>
                </div>
              </div>
            )}
            <div className='weekRange'><Link to={`/Calendar/${id}/AddShifts/${date}`}><button className='titleButton'>Add A Shift</button></Link><br />
              <label className='itemList1'>Write a Note for {moment(date).format('ddd, Do')}
                <input className='formInput2' type='textarea'onChange={e => this.setState({ note: e.target.value })} required />
              </label>
              <button className='titleButton' type='submit' onClick={e => this.handleSubmit(e)}>Save</button></div>
          </div>
        )
      } else {
        return (
          <div>
            {shiftsToday.shifts.map((shift) =>
              <div key={shift.id}>
                <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                  {/* <h2>{moment(date).format('ddd, Do')}</h2> */}
                  <div id={shift.shift_id} className='shiftNode'>
                    <div className='columns3'>
                      <div className='column3'>Capacity<br /><strong>{shift.capacity}</strong></div>
                      <div className='column3'>Start<br /><strong>{moment(shift.start_time).format('h:mm:a')}</strong></div>
                      <div className='column3'>End<br /><strong>{moment(shift.end_time).format('h:mm:a')}</strong></div>
                    </div>
                  </div>
                </Link>
                <div className='centerText'>
                  <button className='navButtons' value={'accept'} onClick={e => this.giveAvailability(e, e.target.value)}>I'm Available</button>
                  <button className='navButtons' value={'deny'} onClick={e => this.denyAvailability(e, e.target.value)}>Not Available</button>
                </div>
              </div>
            )}
            <label className='itemList1'>Leave a Note:<input className='formInput2' type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </label>
            <button className='titleButton' type='submit' onClick={(e) => { if (window.confirm('You successfully submitted a note')) this.handleSubmit(e) }}>Send</button>
          </div>
        )
      }
    } else {
      return (<div>Not Today AssHole</div>)
    }
  }
}

export default DayView
