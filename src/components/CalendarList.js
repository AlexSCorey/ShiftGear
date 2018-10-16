import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalCard, ModalCardBody, ModalCardFooter, ModalBackground } from 'bloomer'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
// import moment from 'moment'

import api from './api'
// import MyShifts from './MyShifts'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: '',
      assignedUsers: [],
      unassignedUsers: [],
      roles: {},
      loaded: false,
      deleteWarning: false
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }

  setDelete (e, id) {
    e.preventDefault()
    this.setState({ deleteWarning: true,
      calId: id })
  }
  cancelDelete (e) {
    e.preventDefault()
    this.setState({ deleteWarning: false })
  }
  deleteCalendar (e, id) {
    e.preventDefault()
    this.props.deleteCalendar(id)
  }
  render () {
    let { calendarGroup, type } = this.props
    let { assignedUsers } = this.state
    if (calendarGroup && calendarGroup.length > 0) {
      return (
        calendarGroup.map((calendar) => {
          if (type === 'Employed Calendars') {
            return (
              <div key={calendarGroup.id}>
                <div className='calendarItem'>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`} key={calendar.id}>
                    Hi
                  </Link>
                </div>
                <div>{assignedUsers.map((user) =>
                  <div>
                    <button className='requestSwap' onClick={e => this.requestSwap(e)}>Request Swap</button>
                    <div>{user.name}
                    </div>
                  </div>
                )}</div>
              </div>
            )
          } else {
            return (
              <div className='calendarItem'>
                <span>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/EditCalendar`} type={'type'}>
                    <button className='btn'><i className='far fa-edit' /></button></Link>
                  <Link className='itemList' to={`/Calendar/${calendar.id}/type/${type}`}>{calendar.name}</Link>
                  <span type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this calendar?')) this.deleteCalendar(e, calendar.id) }}><button className='btn'><i className='far fa-trash-alt' /></button></span></span><br />
              </div>
            )
          }
        }
        ))
    }
  }
}

export default CalendarList
