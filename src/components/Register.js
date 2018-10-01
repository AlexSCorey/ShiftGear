import React, { Component } from 'react'
import { Button, Label, Input, Field, Notification } from 'bloomer'
import { NavLink } from 'react-router-dom'
import 'bulma/css/bulma.css'

import apiCalls from './apiCalls'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      errMsg: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    const { username, password, passwordConf } = this.state
    const { setCurrentUser } = this.props
    if (passwordConf === password) {
      apiCalls.register(username, password)
        .then(user => setCurrentUser(user))
        .catch(err => {
          this.setState({
            errMsg: err.message
          })
        })
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
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
        <div className='RegisterForm'>
          { errMsg &&
          <Notification isColor='warning'>
            <div>{errMsg}</div>
          </Notification>
          }
          <Field>
            <Label>Username</Label>
            <Input value={username} onChange={e => this.setState({ username: e.target.value })} />
            <Label>Password</Label>
            <Input value={password} type='password' onChange={e => this.setState({ password: e.target.value })} />
            <Label>Confirm Password</Label>
            <Input value={passwordConf} type='password' onChange={e => this.setState({ passwordConf: e.target.value })} />
            <Button className='is-warning' onClick={this.handleSubmit}>Register</Button>
          </Field>
        </div>
      </div>
    )
  }
}
export default Register
