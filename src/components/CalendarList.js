import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CalendarList extends Component {
  constructor () {
    super()
    this.state = {
      editing: false,
      name: ''
    }
  }
  render () {
    let { name, id } = this.props
    return (<div className='calendarItem'>
      <Link to={`/Calendar/${id}`} >{name}
        <div className='fas fa-pencil-alt' />
      </Link>
    </div>)
  }
}

export default CalendarList
