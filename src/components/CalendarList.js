import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Delete } from 'bloomer'
import moment from 'moment'

// import { Buton } from 'bloomer'

import api from './api'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: ''
    }
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }

  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(res => res)
  }
  getDate () {
    let date = moment().day(0)
    console.log(date, 'date')
  }
  render () {
    let { name, id } = this.props
    return (<div className='calendarItem'>
      <button onClick={this.getDate}>get Date </button>
      <Link to={`/Calendar/${id}/EditCalendar`} >{name}<Delete type='submit' onClick={e => this.deleteCalendar(e, id)} />
      </Link>
      <Link to={`/Calendar/${id}/WeeklyView`}>Week View</Link>
    </div>)
  }
}

export default CalendarList
