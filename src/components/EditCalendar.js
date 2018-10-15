import React, { Component } from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Delete } from 'bloomer'

class EditCalendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: {}
    }
  }

  getEmployees (props) {
    api.getUsers(this.props.id)
      .then(response => {
        this.setState({
          users: response
        })
      })
  }
  componentDidMount () {
    this.getEmployees()
  }
  deleteOwner (event, ownerId) {
    let { id } = this.props
    event.preventDefault()
    api.deleteEmployee(ownerId, 'owner', id)
      .then(this.forceUpdate())
  }
  deleteManager (event, managerId) {
    let { id } = this.props
    event.preventDefault()
    api.deleteEmployee(managerId, 'manager', id)
      .then(this.forceUpdate())
  }
  deleteEmployee (event, employeeId) {
    let { id } = this.props
    event.preventDefault()
    api.deleteEmployee(employeeId, 'employee', id)
      .then(this.forceUpdate())
  }
  render () {
    const { users } = this.state
    const { managers, employees, owners } = users
    const { id } = this.props
    if (users && managers) {
      return (
        <div>
          <h1>Manager</h1>
          <div>
            {managers.map((manager) =>
              <div key={manager.id} id={manager.id}>
                {manager.name}
                <Delete value={manager.id} dataset='employee' type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this employee from this calendar?')) this.deleteEmployee(e, e.target.value) }} />
              </div>)}
          </div>
          <h1>Employee</h1>
          <div>
            <div>
              {employees.map((employee) =>
                <div key={employee.id} id={employee.id}>
                  {employee.name}
                  <Delete value={employee.id} dataset='employee' type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this employee from this calendar?')) this.deleteEmployee(e, e.target.value) }} />
                </div>)}
            </div>
            <h1>Owner</h1>
            <div>
              {owners.map((owner) =>
                <div key={owner.id} id={owner.id}>
                  {owner.name}
                  <Delete value={owner.id} dataset='owner' type='submit' onClick={(e) => { if (window.confirm('Are you sure you want to delete this employee from this calendar?')) this.deleteEmployee(e, e.target.value) }} />
                </div>)}
            </div>
          </div>
          <Link to={`/Calendar/${id}/AddShifts`}>Add Shifts</Link>
        </div>)
    } else {
      return (
        <div> <div class='loader'>
          <div class='line' />
          <div class='line' />
          <div class='line' />
          <div class='line' />
        </div></div>
      )
    }
  }
}

export default EditCalendar
