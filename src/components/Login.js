import React, { Component } from 'react'
import { Label, Input, Notification, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

import Register from './Register'
import apiCalls from './apiCalls'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      registering: false,
      errMsg: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const { username, password } = this.state
    let { setCurrentUser } = this.props
    apiCalls.login(username, password)
      .then(user => setCurrentUser(user))
      .catch(err => {
        this.setState({
          errMsg: err.message
        })
      })
  }
  register (e, conditional) {
    e.preventDefault()
    this.setState({ 'registering': conditional })
  }
  render () {
    const { username, password, errMsg } = this.state
    if (this.state.registering) {
      return (<Register setCurrentUser={this.props.setCurrentUser} register={this.register} />
      )
    } else {
      return (
        <div>
          <div className='links is-size-6 has-text-centered'>
            <NavLink to='/login'>Log In</NavLink>
            &nbsp;<span className='pipe'>|</span>&nbsp;
            <NavLink to='/register'>Register</NavLink>
          </div>
          { errMsg &&
          <Notification isColor='warning'>
            <div>{errMsg}</div>
          </Notification>
          }
          <Label>Username</Label>
          <Input className='username' value={username} onChange={(e) => this.setState({ username: e.target.value })} />
          <Label>Password</Label>
          <Input className='username' value={password} type='password' onChange={e => this.setState({ password: e.target.value })} />
          <Button className='button is-warning'><NavLink to='/dashboard' onClick={(e) => this.handleSubmit(e)}>Login</NavLink></Button>
        </div>
      )
    }
  }
}

export default Login
