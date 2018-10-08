import React, { Component } from 'react'
import { Notification } from 'bloomer'
import { NavLink } from 'react-router-dom'
import api from './api'
import Register from './Register'
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
      .then(userToken => setCurrentUser(userToken))
  }
  render () {
    const { email, password, errMsg } = this.state
    if (this.state.registering) {
      return (<Register setRegister={this.setRegister()} />
      )
    } else {
      return (
        <div>
          <div className='loginContainer'>
            <div className='toggleLogin'>
              <span to='/login'><strong className='toggleLogin'>login</strong></span>
              <span className='pipe'> |</span>&nbsp;
              <NavLink className='toggleLogin' to='/register' onClick={e => this.setRegistering(e, true)}>register</NavLink>
              { errMsg &&
              <Notification isColor='warning'>
                <div>{errMsg}</div>
              </Notification>
              }
            </div>
            <div className='loginField'>
              <label className='emailLabel'>email</label><br />
              <input className='emailInput' value={email} placeholder='example@example.com' type='email' onChange={e => this.setState({ email: e.target.value })} required /><br />
              <label className='passwordLabel'>password</label><span className='forgotPassword'><NavLink to='/RequestPassword'>Forgot password?</NavLink></span><br />
              <input className='passwordInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required /><br />
              <div className='introMessage'>
                <h1 className='description'>
                Shift work coordination meets online <br />
                solutions customized for small business. <br />
                Login or sign up to
                  <NavLink className='register' to='/register'
                    onClick={e => this.setRegistering(e, true)}
                  > register</NavLink>!</h1>
                <NavLink to='/CalendarList'>
                  <button className='loginButton' onClick={e => { this.handleSubmit(e) }}>
                    <strong>login</strong>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login
