import React, { Component } from 'react'
import { Label, Input, Button, Field } from 'bloomer'
import { NavLink } from 'react-router-dom'

// import Register from './Register'
import api from './api'

class AddEmployeeToCalendar extends Component {
  constructor () {
    super()
    this.state = {
      role: '',
      email: ''
    }
  }
  componentDidMount () {

  }
  handleSubmit (e) {
    console.log('here')
    e.preventDefault()
    const { id } = this.props
    const { role, email } = this.state
    // const { setCurrentUser } = this.props
    api.addEmployeeToCalendar(role, email, id)
  }
  render () {
    const { role, email } = this.state
    return (
      <div>
        <Field>
          <Label>Role
            <select value={role} onChange={e => this.setState({ role: e.target.value })}>
              <option value='employee'>Employee</option>
              <option value='owner'>Owner</option>
              <option value='manager'>Manager</option>
            </select>
          </Label>
          <Label>Email</Label>
          <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
          <NavLink to='/CalendarList'><Button className='is-warning' onClick={e => { this.handleSubmit(e) }}>Submit</Button></NavLink>
        </Field>
      </div>
    )
  }
}
export default AddEmployeeToCalendar
