import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    const { onLogout } = this.props
    return (
      <div>
        <span>
          <div className='headerSpreader'>
            <Link to={`/CalendarList`} className='header' id='home'><ii class='fas fa-home' /> Home</Link>
            <Link to={`Calendar/UpdateProfile`} className='header' id='center'>
              <p className='centerUpdate'>Update Profile</p></Link>
            <Link to={`/Login`} onClick={onLogout} className='header' id='logout'>Logout <ii class='fas fa-sign-out-alt' /></Link>

          </div>
        </span>
      </div>
    )
  }
}

export default Header
