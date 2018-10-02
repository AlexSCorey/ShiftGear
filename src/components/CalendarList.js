import React, { Component } from 'react'

class CalendarList extends Component {
  constructor () {
    super()
    this.state = {
      editing: false,
      name: ''
    }
  }
  render () {
    let { name } = this.props
    return (<div className='calendarItem'>
      <div>{name}
        <div className='fas fa-pencil-alt' />
      </div>
    </div>)
  }
}

export default CalendarList
