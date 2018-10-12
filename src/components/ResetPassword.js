import React, { Component } from 'react'
import api from './api'
import { Link } from 'react-router-dom'

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
    const { password, email } = this.state
    const { token } = this.props
    api.resetPassword(email, password, token)
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
        <button onClick={this.handleSubmit}><Link to='/login'>Submit</Link></button>
      </div>)
  }
}
export default ResetPassword
