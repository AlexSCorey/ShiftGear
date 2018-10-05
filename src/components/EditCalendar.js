import React, { Component } from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Button } from 'bloomer'

class EditCalendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: {},
      deleteEmployee: null
    }
  }

  getEmployees (props) {
    api.getUsers(this.props.id)
      .then(response => {
        this.setState({
          users: response
        })
        console.log(this.state.users, 'api')
      })
  }

  componentDidMount () {
    this.getEmployees()
  }

  // role and calendarId

  handleDelete (event, id, value) {
    console.log(this.state.users.employees, 'handleDelete')
    console.log(id, 'handleDelete!')
    console.log(value, 'handleDelete!!')
    event.preventDefault()
    api.deleteEmployee(id, value)
    console.log(value, 'handleDelete2')
    console.log(id, 'handleDelete2')
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
                <div key={employee.id} id={employee.id}>
                  {employee.name}
                  <Button value={employee.id} type='submit' onClick={event =>
                    this.handleDelete(event, id, event.target.value)}>Delete Employee</Button>
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
        </div>)
    } else {
      return (
        <div> something went wrong </div>
      )
    }
  }
}

export default EditCalendar
