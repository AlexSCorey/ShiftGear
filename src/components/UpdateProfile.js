import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import api from './api'

class UpdateProfile extends Component {
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
    if (passwordConf === password) {
      api.updateProfile(name, password, email, phoneNum)
        .then(res => res.body)
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { name, password, passwordConf, email, phoneNum } = this.state
    return (
      <div className='loginField'>
        <label className='emailLabel'>name</label>
        <input className='emailInput' value={name} onChange={e => this.setState({ name: e.target.value })} required />
        <label className='emailLabel'>email</label>
        <input className='emailInput' placeholder='example@example.com' value={email} type='email' onChange={e => this.setState({ email: e.target.value })} required />
        <label className='emailLabel'>password</label>
        <input className='emailInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
        <label className='emailLabel'>confirm password</label>
        <input className='emailInput' value={passwordConf} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
        <label className='emailLabel'>phone number</label>
        <input className='emailInput' value={phoneNum} type='tel' name='phone' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={e => this.setState({ phoneNum: e.target.value })} />
        <NavLink to='/CalendarList'><button className='loginButton' onClick={e => { this.handleSubmit(e) }}>Update</button></NavLink>
      </div>
    )
  }
}
export default UpdateProfile
