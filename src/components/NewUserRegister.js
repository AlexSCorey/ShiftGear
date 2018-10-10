import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// import Register from './Register'
import api from './api'

class NewUserRegister extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      password: '',
      confPassword: ''
    }
  }
  handleSubmit (e) {
    const { id } = this.props
    e.preventDefault()
    const { password, passwordConf, name } = this.state
    const { setNewUser } = this.props
    if (passwordConf === password) {
      api.newUserRegistrationCompletion(name, password, id)
        .then(userToken => {
          let token = userToken
          setNewUser(token)
        })
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { password, passwordConf, name } = this.state
    return (<div>
      <h1 className='emaillabel'>Welcome! Please complete the form below to finalize the registration process</h1>
      <label className='emailLabel'>name</label>
      <input className='emailInput' value={name} placeholder='Provide First and Last Name' type='text' onChange={e => this.setState({ name: e.target.value })} required />
      <label className='emailLabel'>password</label>
      <input className='emailInput' value={password} placeholder='Must be at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required />
      <label className='emailLabel'>confirm password</label>
      <input className='emailInput' value={passwordConf} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ passwordConf: e.target.value })} required />
      <NavLink to='/CalendarList'><button className='loginButton' onClick={e => { this.handleSubmit(e) }}>register</button></NavLink>
    </div>)
  }
}
export default NewUserRegister
