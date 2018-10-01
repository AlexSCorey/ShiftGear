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
