import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Delete } from 'bloomer'
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
  render () {
    let { name, id } = this.props
    return (<div className='calendarItem'>
      <Link to={`/Calendar/${id}/EditCalendar`}>{name}<Delete type='submit' onClick={e => this.deleteCalendar(e, id)} />
      </Link>
    </div>)
  }
}

export default CalendarList
