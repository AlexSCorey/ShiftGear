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

  // role and calendarId

  handleDelete (event, employeeId, role) {
    let { id } = this.props
    event.preventDefault()
    console.log(role, 'employeeId!')
    console.log(id, 'calendarId!!')
    api.deleteEmployee(employeeId, id)
      .then(this.forceUpdate())
  }

  render () {
    const { users } = this.state
    const { managers, employees, owners } = users
    const { id } = this.props
    if (users && managers) {
      return (
        <div>
          <div>
            <h2>Manager</h2>
          </div>
          <div>
            {managers.map((manager) =>
              <div key={manager.id}>
                {manager.name}
              </div>)}
          </div>

          <div>
            <h2>Employee</h2>
          </div>
          <div>
            <div>
              {employees.map((employee) =>
                <div key={employee.id} EmployeeId={employee.id}>
                  {employee.name}
                  <Button value={employee.id} dataset='employee' type='submit' onClick={event =>
                    this.handleDelete(event, event.target.value, event.target.dataset)}>Delete Employee</Button>
                </div>)}
            </div>
            <div>
              <h2>Owner</h2>
            </div>
            <div>
              {owners.map((owner) =>
                <div key={owner.id}>
                  {owner.name}
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
