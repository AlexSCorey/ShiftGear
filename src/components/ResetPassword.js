import React, { Component } from 'react'
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
        <label className='emailLabel'>email</label>
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <label className='emailLabel'>password</label>
        <input className='emailInput' value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
        <label className='emailLabel'>confirm password</label>
        <input className='emailInput' value={passwordConf} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
      </div>)
  }
}
export default ResetPassword
