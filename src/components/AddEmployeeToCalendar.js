import React, { Component } from 'react'
import { Label, Input, Button, Field } from 'bloomer'
import { Link } from 'react-router-dom'

// import Register from './Register'
import api from './api'

class AddEmployeeToCalendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      role: 'employee',
      email: ''
    }
  }
  componentDidMount () {
    console.log(this.props.setCurrentUser, 'is it here?')
  }
  handleSubmit (e) {
    e.preventDefault()
    const { id } = this.props
    const { role, email } = this.state
    api.addEmployeeToCalendar(role, email, id)
  }

  render () {
    const { email } = this.state
    return (
      <div>
        <Field>
          <Label htmlFor='role'>Role</Label>
          <select id='role' onChange={e => this.setState({ role: e.target.value })}>
            <option value='employee'>Employee</option>
            <option value='owner'>Owner</option>
            <option value='manager'>Manager</option>
          </select>
          <Label>Email</Label>
          <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
          <Link to='/CalendarList'><Button className='is-warning' onClick={e => { this.handleSubmit(e) }}>Submit</Button></Link>
        </Field>
      </div>
    )
  }
}
export default AddEmployeeToCalendar
