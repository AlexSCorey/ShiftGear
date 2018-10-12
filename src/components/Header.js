import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    const { onLogout } = this.props
    return (
      <div className='header'>
        <span>
          <div className='headerSpreader'>
            <Link to={`/CalendarList`}> <button className='header' id='home'><ii class='fas fa-home' /> Home</button></Link>
            <button onClick={onLogout} className='header' id='logout'>Logout <ii class='fas fa-sign-out-alt' /></button>
          </div>
        </span>
      </div>
    )
  }
}

export default Header
