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
      employeeNotes: {},
      loaded: false
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
        console.log(res, 'res body')
        this.setState({ employeeNotes: res })
      })
  }
  getShifts () {
    let { id, date } = this.props
    api.getShiftsForADay(id, date)
      .then(res => {
        // console.log(res, 'res in day view')
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
    let { shiftsToday, loaded, employeeNotes } = this.state
    if (loaded) {
      console.log(shiftsToday, 'roles in render')
      if ((shiftsToday.roles.indexOf('owner') > -1) || (shiftsToday.roles.indexOf('manager') > -1)) {
        if (employeeNotes) {
          return (
            <div>
              <div>
                <div>Notes:</div>
                <div>
                  {employeeNotes.notes.map((note) =>
                    <div>
                      <div>{note.user_name}: </div>
                      <div>{note.text}</div>
                    </div>
                  )}
                </div>
              </div>
              {shiftsToday.shifts.map((shift) =>
                <div>
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
                      <Link to={`/Calendar/${id}/AddShifts/${shift.shift_id}`}>Edit</Link>
                      <Delete id={shift.shift_id} onClick={e => this.deleteShift(e, shift.shift_id)} />
                    </div>
                  </Link>
                </div>
              )}
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
                <div>
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
                      <Link to={`/Calendar/${id}/AddShifts/${shift.shift_id}`}>Edit</Link>
                      <Delete id={shift.shift_id} onClick={e => this.deleteShift(e, shift.shift_id)} />
                    </div>
                  </Link>
                </div>
              )}
              <Label>Note:
                <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
              </Label>
              <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
            </div>
          )
        }
      } else if ((!shiftsToday.roles.indexOf('owner') > -1) && (!shiftsToday.roles.indexOf('manager') > -1)) {
        if (employeeNotes) {
          return (<div>
            <div>
              <div>Notes:</div>
              <div>
                {employeeNotes.notes.map((note) =>
                  <div>
                    <div>{note.text}</div>
                  </div>
                )}
              </div>
            </div>
            {shiftsToday.shifts.map((shift) =>
              <div>
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
              </div>
            )}
            <Label>Note:
              <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </Label>
            <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
          </div>)
        } else {
          return (<div>
            {shiftsToday.shifts.map((shift) =>
              <div>
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
              </div>
            )}
            <Label>Note:
              <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </Label>
            <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
          </div>)
        }
      }
    } else {
      return (<div>Not Today AssHole</div>)
    }
  }
}
export default DayView
