import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import 'bulma/css/bulma.css'

import api from './api'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      phoneNum: '',
      errMsg: null
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
    const { name, password, passwordConf, email, phoneNum } = this.state
    return (
      <div>
        <div className='loginContainer'>
          <div className='toggleLogin'>
            <NavLink className='toggleLogin' to='/login'>login</NavLink>
            <span className='pipe'> |</span>&nbsp;
            <span to='/register'><strong className='toggleLogin'>register</strong></span>
          </div>
          <div className='loginField'>
            <label className='emailLabel'>name</label>
            <input className='emailInput' value={name} onChange={e => this.setState({ name: e.target.value })} required />
            <label className='emailLabel'>email</label><br />
            <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
            <label className='emailLabel'>password</label><br />
            <input className='emailInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
            <label className='emailLabel'>confirm password</label>
            <input className='emailInput' value={passwordConf} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
            <label className='emailLabel'>phone number</label><br />
            <input className='emailInput' value={phoneNum} type='tel' name='phone' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={e => this.setState({ phoneNum: e.target.value })} />
            <NavLink to='/CalendarList'><button className='loginButton' onClick={e => { this.handleSubmit(e) }}><strong>register</strong></button></NavLink>
          </div>
        </div>
      </div>
    )
  }
}
export default Register
