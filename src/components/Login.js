import React, { Component } from 'react'
import { Notification } from 'bloomer'
import { NavLink } from 'react-router-dom'
import api from './api'
// import Register from './register'
// import styles from './App.css'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      registering: false,
      errMsg: null
    }
    this.setRegister = this.setRegister.bind(this)
  }
  setRegister (e, value) {
    e.preventDefault()
    this.setState({ registering: value })
  }
  handleSubmit (e) {
    e.preventDefault()
    const { password, email } = this.state
    const { setCurrentUser } = this.props
    api.login(email, password)
      .then(userToken =>
        setCurrentUser(userToken))
  }
  render () {
    const { email, password, errMsg } = this.state
    return (
      <div className='loginContainer'>
        <div className='toggleLogin'>
          <span to='/login'><strong className='toggleLogin'>login</strong></span>
          <span className='pipe'> |</span>&nbsp;
          <NavLink className='toggleLogin' to='/Register' onClick={e => this.setRegistering(e, true)}>register</NavLink>
        </div>
        { errMsg &&
        <Notification isColor='warning'>
          <div>{errMsg}</div>
        </Notification>
        }
        <div className='loginField'>
          <label className='emailLabel'>email</label><br />
          <input className='emailInput' value={email} placeholder='manager@example.com' type='email' onChange={e => this.setState({ email: e.target.value })} required /><br />
          <label className='passwordLabel'>password</label><span className='forgotPassword'><NavLink to='/RequestNewPassword'><a>Forgot password?</a></NavLink></span><br />
          <input className='passwordInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required /><br />
          <NavLink to='/CalendarList'>
            <button className='loginButton' onClick={e => { this.handleSubmit(e) }}>Login</button>
          </NavLink>
          <div className='introMessage'>
            <h1 className='description'>
                Shiftgear makes workforce scheduling<br />
                mobile with an interface designed<br />
                for phones, using smart tools<br />
                to automate scheduling tasks.<br />
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
