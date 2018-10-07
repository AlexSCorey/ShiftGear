import React, { Component } from 'react'
import { Label, Input, Notification, Button } from 'bloomer'

import { NavLink } from 'react-router-dom'

import api from './api'
import Register from './Register'
// import styles from '../Login.css.js'
class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
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
  handleSubmit (e) {
    e.preventDefault()
    const { password, email } = this.state
    const { setCurrentUser } = this.props
    api.login(email, password)
      .then(userToken => setCurrentUser(userToken))
  }
  render () {
    const { email, password, errMsg } = this.state
    if (this.state.registering) {
      return (<Register setRegister={this.setRegister()} />
      )
    } else {
      return (
        <div>
          <div className='header' />
          <div className='links is-size-6 has-text-centered'>
            <NavLink to='/login'>Log In</NavLink>
            <span className='pipe'>|</span>&nbsp;
            <NavLink to='/register' onClick={e => this.setRegistering(e, true)}>Register</NavLink>
          </div>
          { errMsg &&
          <Notification isColor='warning'>
            <div>{errMsg}</div>
          </Notification>
          }
          <Label>Email</Label>
          <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
          <Label>Password</Label>
          <Input value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
          <NavLink to='/CalendarList'><Button className='button is-warning' onClick={e => { this.handleSubmit(e) }}>Login</Button></NavLink>
        </div>
      )
    }
  }
}

export default Login
