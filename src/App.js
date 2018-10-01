import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <main className='main'>
            <div className='board'>
              <Route path='/' render={() =>
                <Guard condition={!this.state.currentUser} redirectTo='/login'>
                  <Register />
                </Guard>} />
              <Route path='/Register' render={() =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Register />
                </Guard>} />
            </div>
          </main>
        </div>
      </Router>
    )
  }
}
const Guard = ({ redirectTo, condition, children }) => {
  if (condition) {
    return children
  } else {
    return <Redirect to={redirectTo} />
  }
}

export default App
