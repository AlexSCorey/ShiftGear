import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bloomer'
import api from './api'

class CalendarList extends Component {
  constructor () {
    super()
    this.state = {
      editing: false,
      name: ''
    }
  }
  // getUsers () {
  //   api.getUser(this.props.id)
  // }
  deleteCalendar (e, id) {
    e.preventDefault()
    api.deleteCalendar(id)
      .then(this.forceUpdate())
  }
  render () {
    let { name, id } = this.props
    return (<div className='calendarItem'>
      <Link to={`/Calendar/${id}`} >{name}
        <div className='fas fa-pencil-alt' />
      </Link>
      <Button type='submit' onClick={e => this.handleDelete(e, id)}>Delete Calendar</Button>
    </div>)
  }
}

export default CalendarList
