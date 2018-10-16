import React, { Component } from 'react'
import { Button } from 'bloomer'
import { Link } from 'react-router-dom'

import api from './api'
class ManageApproveSwap extends Component {
  constructor () {
    super()
    this.state = { complete: false }
  }

  approvetShiftSwap (e, value) {
    let { token } = this.props
    e.preventDefault()
    this.setState({ complete: true })
    api.approveShiftSwap(value, token)
      .then(res => res)
  }
  denyShiftSwap (e, value) {
    let { token } = this.props
    e.preventDefault()
    this.setState({ complete: true })
    api.approveShiftSwap(value, token)
      .then(res => res)
  }

  render () {
    if (this.state.complete) {
      return (<div><div className='whitespace'>&nbsp;</div>
        <h1 className='titles'>Thank you very much. Your response has been recorded. Have a great day!</h1>
        <button className='titleButton'><Link to='/login'>Go To Login Page</Link></button>
      </div>)
    } else {
      return (
        <div><div className='whitespace'>&nbsp;</div>
          <h1 className='titles'>Approve or Deny This Shift Swap</h1>
          <button className='requestSwap' value={'approve'} onClick={(e) => { this.approvetShiftSwap(e, e.target.value) }}>Approve Swap</button>
          <button className='requestSwap3' value={'deny'} onClick={(e) => { this.denyShiftSwap(e, e.target.value) }}>Deny Swap</button>
        </div>)
    }
  }
}
export default ManageApproveSwap
