import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './api'

class RequestPasswordReset extends Component {
  constructor () {
    super()
    this.state = {
      email: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { email } = this.state
    api.RequestPasswordReset(email)
  }
  render () {
    const { email } = this.state
    return (
      <div>
        <label className='emailLabel'>email</label><br />
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <Link to='/login'><button onClick={this.handleSubmit}>Submit</button></Link>
      </div>
    )
  }
}
export default RequestPasswordReset
