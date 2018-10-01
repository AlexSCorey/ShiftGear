import React, { Component } from 'react'
import { Label, Input, Notification, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

import Register from './Register'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      registering: false,
      errMsg: null
    }
    this.setRegister = this.setRegister.bind(this)
  }
  setRegister (e, value) {
    e.preventDefault()
    this.setState({ registering: value })
  }

  render () {
    const { username, password, errMsg } = this.state
    if (this.state.registering) {
      return (<Register setRegister={this.setRegister()} />
      )
    } else {
      return (
        <div>
          <div className='links is-size-6 has-text-centered'>
            <NavLink to='/login'>Log In</NavLink>
            &nbsp;<span className='pipe'>|</span>&nbsp;
            <NavLink to='/register' onClick={e => this.setRegistering(e, true)}>Register</NavLink>
          </div>
          { errMsg &&
          <Notification isColor='warning'>
            <div>{errMsg}</div>
          </Notification>
          }
          <Label>Username</Label>
          <Input className='username' value={username} />
          <Label>Password</Label>
          <Input className='username' value={password} type='password' />
          <Button className='button is-warning'><NavLink to='/dashboard'>Login</NavLink></Button>
        </div>
      )
    }
  }
}

export default Login
