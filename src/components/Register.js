import React, { Component } from 'react'
import { Button, Label, Input, Field, Notification } from 'bloomer'
import { NavLink } from 'react-router-dom'
import 'bulma/css/bulma.css'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      errMsg: null
    }
  }

  render () {
    const { username, password, passwordConf, errMsg } = this.state
    return (
      <div>
        <div className='links is-size-6 has-text-centered'>
          <NavLink to='/login'>Log In</NavLink>
          &nbsp;<span className='pipe'>|</span>&nbsp;
          <NavLink to='/register'>Register</NavLink>
        </div>
        <Field>
          <Label>Username</Label>
          <Input value={username} />
          <Label>Password</Label>
          <Input value={password} type='password' />
          <Label>Confirm Password</Label>
          <Input value={passwordConf} type='password' />
          <Button className='is-warning' >Register</Button>
        </Field>
      </div>
    )
  }
}
export default Register
