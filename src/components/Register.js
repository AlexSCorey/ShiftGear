import React, { Component } from 'react'
import { Button, Label, Input, Field } from 'bloomer'
import { NavLink } from 'react-router-dom'
import 'bulma/css/bulma.css'

import api from './api'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      phoneNum: '',
      errMsg: null
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { name, password, passwordConf, email, phoneNum } = this.state
    // const { setCurrentUser } = this.props
    if (passwordConf === password) {
      api.register(name, password, email, phoneNum)
        .then(userToken => userToken)
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { name, password, passwordConf, email, phoneNum } = this.state
    return (
      <div>
        <div className='links is-size-6 has-text-centered'>
          <NavLink to='/login'>Log In</NavLink>
          &nbsp;<span className='pipe'>|</span>&nbsp;
          <NavLink to='/register'>Register</NavLink>
        </div>
        <Field>
          <Label>Name</Label>
          <Input value={name} onChange={e => this.setState({ name: e.target.value })} required />
          <Label>Email</Label>
          <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
          <Label>Password</Label>
          <Input value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
          <Label>Confirm Password</Label>
          <Input value={passwordConf} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
          <Label>Phone Number</Label>
          <Input value={phoneNum} type='tel' name='phone' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={e => this.setState({ phoneNum: e.target.value })} />
          <NavLink to='/dashboard'><Button className='is-warning' onClick={e => { this.handleSubmit(e) }}>Register</Button></NavLink>
        </Field>
      </div>
    )
  }
}
export default Register
