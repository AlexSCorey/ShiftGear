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
      .then(res => {
        console.log(res)
        this.setState({ email: '' })
      })
  }
  render () {
    const { email } = this.state
    const { id } = this.props
    return (
      <div className='enclosingDiv'>
        <div className='calendarItem'>
          <label className='itemList1' htmlFor='role'><strong>Select a Role for a New User</strong></label><br />
          <select placeholder='--select--' id='role' className='selector' onChange={e => this.setState({ role: e.target.value })}>
            <option value='employee'>Employee</option>
            <option value='owner'>Owner</option>
            <option value='manager'>Manager</option>
          </select><br />
        <input className='formInput2' placeholder='Enter the Email Address for a New User' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <button className='titleButton'onClick={e => { this.handleSubmit(e) }}>Register A New User</button>
      </div>
    )
  }
}
export default AddEmployeeToCalendar
