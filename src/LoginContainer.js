import React, { Component } from 'react'

class LoginContainer extends Component {
  constructor () {
    super()
    this.setUserToken = this.setUserToken.bind(this)
  }
  setUserToken (e) {
    apiCalls.getUserToken()
  }
  render () {
    const { currentUser } = this.state

    if (this.state.currentUser) {
      return (
        <div className='App'>
          <main className='main'>
            <div className='board'>
              <CalendarList setUserToken={this.setUserToken} setCurrentUser={this.setCurrentUser} />
            </div>
          </main>
        </div>
      )
    }
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

export default LoginContainer
