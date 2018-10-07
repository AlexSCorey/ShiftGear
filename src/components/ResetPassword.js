import React, { Component } from 'react'
import { Label, Input } from 'bloomer'
import api from './api'

class ResetPassword extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      passwordConf: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { name, password, passwordConf, email, phoneNum } = this.state
    const { setCurrentUser } = this.props
    if (passwordConf === password) {
      api.register(name, password, email, phoneNum)
        .then(userToken => setCurrentUser(userToken))
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { password, passwordConf, email } = this.state
    return (
      <div>
        <Label>Email</Label>
        <Input placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <Label>Password</Label>
        <Input value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
        <Label>Confirm Password</Label>
        <Input value={passwordConf} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
      </div>)
  }
}
export default ResetPassword
