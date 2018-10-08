import React, { Component } from 'react'
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
  }
  handleSubmit (e) {
    e.preventDefault()
    const { id } = this.props
    const { role, email } = this.state
    api.addEmployeeToCalendar(role, email, id)
  }
  render () {
    const { email } = this.state
    const { id } = this.props
    return (
      <div className='loginField'>
        <label className='emailLabel' htmlFor='role'>role</label>
        <select id='role' onChange={e => this.setState({ role: e.target.value })}>
          <option value='employee'>Employee</option>
          <option value='owner'>Owner</option>
          <option value='manager'>Manager</option>
        </select><br />
        <label className='emailLabel'>email</label>
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <button className='loginButton' onClick={e => { this.handleSubmit(e) }}><Link to={`/CalendarList/${id}`}><strong>submit</strong></Link></button>
      </div>
    )
  }
}
export default AddEmployeeToCalendar
