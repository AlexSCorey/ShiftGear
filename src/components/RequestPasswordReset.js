import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './api'

class RequestPasswordReset extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      msg: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { password, email } = this.state
    const { setCurrentUser } = this.props
    api.login(email, password)
      .then(userToken => setCurrentUser(userToken))
  }
  render () {
    const { email } = this.state
    return (
      <div>
        <label className='emailLabel'>email</label>
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <Link to='/CalendarList'><button className='loginButton' onClick={e => { this.handleSubmit(e) }}>login</button></Link>
      </div>
    )
  }
}
export default RequestPasswordReset
