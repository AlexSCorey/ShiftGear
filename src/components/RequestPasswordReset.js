import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import api from './api'

class RequestPasswordReset extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      passwordConf: '',
      errMsg: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { password, email, passwordConf } = this.state
    const { id } = this.props
    if (passwordConf === password) {
      api.RequestPasswordReset(email, password, id)
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { email, password, passwordConf } = this.state
    return (
      <div>
        <label className='emailLabel'>email</label><br />
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <label className='emailLabel'>password</label><br />
        <input className='emailInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
        <label className='emailLabel'>confirm password</label>
        <input className='emailInput' value={passwordConf} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
      </div>
    )
  }
}
export default RequestPasswordReset
