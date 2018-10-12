import React, { Component } from 'react'
import { Button, Label, Input, Delete } from 'bloomer'
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
      loaded: false,
      assignedUsers: [],
      unassignedUsers: []
    }
  }
  componentDidMount () {
    this.getShifts()
    this.getNotes()
  }

  getNotes () {
    let { id, date } = this.props
    let today = moment(date).format('YYYY-MM-DD')
    api.getNotes(id, today)
      .then(res => {
        this.setState({ employeeNotes: res })
      })
  }
  getShifts () {
    let { id, date } = this.props
    api.getShiftsForADay(id, date)
      .then(res => {
        this.setState({ shiftsToday: res,
          loaded: true })
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
    let { shiftsToday, loaded, unassignedUsers } = this.state
    if (loaded) {
      if ((shiftsToday.roles.indexOf('owner') > -1) || (shiftsToday.roles.indexOf('manager') > -1)) {
        return (
          <div>
            <h2 className='titles'>{moment(date).format('ddd, Do')}</h2>
            {shiftsToday.shifts.map((shift) =>
              <div key={shift.shift_id} className='columns3'>
                <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                  <div id={shift.shift_id} className='shiftNode'>
                    <div><span>
                      <div className='column3'>Capacity: {shift.capacity} </div>
                      <div className='column3'>Start: {moment(shift.start_time).format('h:mm:a')}</div>
                      <div className='column3'>End: {moment(shift.end_time).format('h:mm:a')}</div>
                    </span></div>
                    <Link className='column3'to={`/Calendar/${id}/AddShifts/${shift.shift_id}`}>Edit</Link>
                    <Delete id={shift.shift_id} onClick={e => this.deleteShift(e, shift.shift_id)} />
                  </div>
                </Link>
                <div>
                  <div className='temp'>
                    <div>Assigned Staff:</div>
                    {shift.assigned_users.map((user) =>
                      <div key={user.id}>{user.name}</div>)}
                  </div>
                  <div>
                    <div>Unassigned Staff</div>
                    <div>{unassignedUsers.map((user) =>
                      <div>{user.name}
                        <Button type='checkbox' value={user.id} onClick={e => this.assignStaff(e.target.value)}>Assign</Button>
                      </div>
                    )}</div>
                  </div>
                </div>
              </div>
            )}
            <Link to={`/Calendar/${id}/AddShifts/${date}`}><Button>Add A Shift</Button></Link>
            <Label>Note:
            <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </Label>
            <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
          </div>
        )
      } else {
        return (
          <div>
            {shiftsToday.shifts.map((shift) =>
              <div key={shift.id}>
                <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                  <h2>{moment(date).format('ddd, Do')}</h2>
                  <div id={shift.shift_id} className='shiftNode'>
                    <Label>Capacity</Label>
                    <div>{shift.capacity}</div>
                    <Label>Start</Label>
                    <div>{moment(shift.start_time).format('h:mm:a')}</div>
                    <Label>End</Label>
                    <div>{moment(shift.end_time).format('h:mm:a')}</div>
                    <Label>Published</Label>
                    <div>{shift.published}</div>
                  </div>
                </Link>
                <Button value={'accept'} onClick={e => this.giveAvailability(e, e.target.value)}>I'm Available</Button>
                <Button value={'deny'} onClick={e => this.denyAvailability(e, e.target.value)}>Not Available</Button>
              </div>
            )}
            <Label>Note:
            <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </Label>
            <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
          </div>
        )
      }
    } else {
      return (<div>Not Today AssHole</div>)
    }
  }
}

export default DayView
