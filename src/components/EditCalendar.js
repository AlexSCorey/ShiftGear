import React, { Component } from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Button } from 'bloomer'

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
    api.deleteEmployee(ownerId, 'manager', id)
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
          <h2>Manager</h2>
          <div>
            {managers.map((manager) =>
              <div key={manager.id} id={manager.id}>
                {manager.name}
                <Button value={manager.id} dataset='employee' type='submit' onClick={event =>
                  this.deleteManager(event, event.target.value)}>Delete Manager</Button>
              </div>)}
          </div>
          <h2>Employee</h2>
          <div>
            <div>
              {employees.map((employee) =>
                <div key={employee.id} id={employee.id}>
                  {employee.name}
                  <Button value={employee.id} dataset='employee' type='submit' onClick={event =>
                    this.deleteEmployee(event, event.target.value)}>Delete Employee</Button>
                </div>)}
            </div>
            <h2>Owner</h2>
            <div>
              {owners.map((owner) =>
                <div key={owner.id} id={owner.id}>
                  {owner.name}
                  <Button value={owner.id} dataset='owner' type='submit' onClick={event =>
                    this.deleteEmployee(event, event.target.value)}>Delete Owner</Button>
                </div>)}
            </div>
          </div>
          <Link to={`/Calendar/${id}/AddEmployee`}>Add Employee</Link>
          <Link to={`/Calendar/${id}/AddShifts`}>Add Shifts</Link>
        </div>)
    } else {
      return (
        <div> something went wrong </div>
      )
    }
  }
}

export default EditCalendar
