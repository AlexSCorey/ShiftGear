import React, { Component } from 'react'
import { Label, Input, Button, Field } from 'bloomer'
import { NavLink } from 'react-router-dom'

// import Register from './Register'
import api from './api'

class AddEmployeeToCalendar extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      phone: ''
    }
  }
  componentDidMount () {

  }
  handleSubmit (e) {
    console.log('here')
    e.preventDefault()
    const { id } = this.props
    const { name, email, phone } = this.state
    const { setCurrentUser } = this.props
    api.addEmployeeToCalendar(name, email, id, phone)
      .then(userToken => setCurrentUser(userToken))
  }
  render () {
    const { name, email, phoneNum } = this.state
    return (
      <div>
        <Field>
          <Label>Name</Label>
          <Input value={name} onChange={e => this.setState({ name: e.target.value })} required />
          <Label>Email</Label>
          <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
          <Label>Phone Number</Label>
          <Input value={phoneNum} type='tel' name='phone' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={e => this.setState({ phoneNum: e.target.value })} />
          <NavLink to='/CalendarList'><Button className='is-warning' onClick={e => { this.handleSubmit(e) }}>Submit</Button></NavLink>
        </Field>
      </div>
    )
  }
}
export default AddEmployeeToCalendar
