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
    console.log(shiftId, 'here')
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
    let { shiftsToday, shiftsLoaded } = this.state
    if (shiftsLoaded) {
      if ((shiftsToday.roles.indexOf('owner') > -1) || (shiftsToday.roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div className='itemList1'>{moment(date).format('ddd, Do')}</div>
            <div className='enclosingDiv'>

              {shiftsToday.shifts.map((shift) =>
                <div key={shift.shift_id}>

                  <span>

                    <Link to={`/Calendar/${id}/EditShifts/${shift.shift_id}`} type={'type'}>
                      <button className='column2'><i className='far fa-edit' /> Edit Shift</button></Link>
                    <button className='column2' id={shift.shift_id} onClick={e => { if (window.confirm('Are you sure you want to delete this calendar?')) this.deleteShift(e, shift.shift_id) }}>
                  Delete Shift <i className='far fa-trash-alt' /></button>
                  </span><br />

                  <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                    <div id={shift.shift_id} className='shiftNode'>
                      <div className='columns3'>
                        <div className='column3'>Capacity<br /><strong>{shift.capacity}</strong></div>
                        <div className='column3'>Start<br /><strong>{moment(shift.start_time).utcOffset(shift.end_time).format('h:mma')}</strong></div>
                        <div className='column3'>End<br /><strong>{moment(shift.end_time).utcOffset(shift.end_time).format('h:mma')}</strong></div>
                      </div>
                    </div>
                  </Link>

                  <div>
                    <div className='temp'>
                      <div className='itemList1'>Assigned Staff</div>
                      {shift.assigned_users.map((user) =>
                        <div key={user.id}><p className='itemList3'>{user.name}</p></div>)}
                    </div>
                    <div className='whitespace'>&nbsp;</div>
                    <div className='whitespace'>&nbsp;</div>
                  </div>
                </div>

              )}

              <div className='weekRange'><Link to={`/Calendar/${id}/AddShifts/`}><button className='titleButton'>Add A Shift</button></Link><br />
                <label className='itemList1'>Write a Note for {moment(date).format('ddd, Do')}
                  <input className='formInput2' type='textarea'onChange={e => this.setState({ note: e.target.value })} required />
                </label>
                <button className='titleButton' type='submit' onClick={e => this.handleSubmit(e)}>Save</button></div>

            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div className='itemList1'>{moment(date).format('ddd, Do')}</div>
            {shiftsToday.shifts.map((shift) =>
              <div key={shift.id}>
                <Link to={`/calendars/${id}/shifts/${shift.shift_id}/usershifts`}>
                  {/* <h2>{moment(date).format('ddd, Do')}</h2> */}
                  <div id={shift.shift_id} className='shiftNode'>
                    <div className='columns3'>
                      <div className='column3'>Capacity<br /><strong>{shift.capacity}</strong></div>
                      <div className='column3'>Start<br /><strong>{moment(shift.start_time).format('h:mma')}</strong></div>
                      <div className='column3'>End<br /><strong>{moment(shift.end_time).format('h:mma')}</strong></div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            <label className='itemList1'>Leave a Note:<input className='formInput2' type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
            </label>
            <button className='titleButton' type='submit' onClick={(e) => { if (window.confirm('You successfully submitted a note')) this.handleSubmit(e) }}>Send</button>
          </div>
        )
      }
    } else {
      return (<div class='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>)
    }
  }
}

export default DayView
