import React, { Component } from 'react'

import Login from './components/Login'

class LoginContainer extends Component {
  constructor () {
    super()
    this.setUserToken = this.setUserToken.bind(this)
  }

  render () {
    if (this.state.currentUser) {
      return (
        <div className='App'>
          <main className='main'>
            <div className='board'>
              <Login setUserToken={this.setUserToken} setCurrentUser={this.setCurrentUser} />
            </div>
          </main>
        </div>
      )
    }
  }
}

export default LoginContainer
