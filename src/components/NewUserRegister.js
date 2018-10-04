import React, { Component } from 'react'
import { Label, Input, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

// import Register from './Register'
import api from './api'

class NewUserRegister extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      password: '',
      confPassword: ''
    }
  }
  handleSubmit (e) {
    const { id } = this.props
    e.preventDefault()
    const { password, passwordConf, name } = this.state
    const { setNewUser } = this.props
    if (passwordConf === password) {
      api.newUserRegistrationCompletion(name, password, id)
        .then(userToken => {
          let token = userToken
          setNewUser(token)
        })
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { password, passwordConf, name } = this.state
    return (<div>
      <Label>Name</Label>
      <Input value={name} placeholder='Provide First and Last Name' type='text' onChange={e => this.setState({ name: e.target.value })} required />
      <Label>Password</Label>
      <Input value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
      <Label>Confirm Password</Label>
      <Input value={passwordConf} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
      <NavLink to='/CalendarList'><Button className='is-warning' onClick={e => { this.handleSubmit(e) }}>Register</Button></NavLink>
    </div>)
  }
}
export default NewUserRegister
