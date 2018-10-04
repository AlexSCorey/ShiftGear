import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import api from './api'

class CalendarList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      name: ''
    }
    this.editCalendar = this.editCalendar.bind(this)
  }

  editCalendar (calendar) {
    this.setState(state => {
      return update(state, {
        calendar: { editing: true }
      })
    }, () => {
      api.updateCalendar(this.state.calendar)
    })
  }

  render () {
    let { name, id } = this.props
    return (<div className='calendarItem'>
      <Link to={`/Calendar/${id}`}>{name}
        <div className='fas fa-pencil-alt' />
      </Link>
    </div>)
  }
}

export default CalendarList
