import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class EditCalendar extends Component {
  render () {
    const { id } = this.props
    return (<div>
      <Link to={`/Calendar/${id}/AddEmployee`}>Add Employee</Link>
    </div>)
  }
}
export default EditCalendar
