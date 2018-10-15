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
      return (<div>
        <div>Thank you very much.  Your response has been recorded.  Have a great day!</div>
        <button><Link to='/login'>Go To Login Page</Link></button>
      </div>)
    } else {
      return (
        <div>
          <h1>Approve or Deny This Shift Swap</h1>
          <Button isColor='succes' value={'approve'} onClick={(e) => { if (window.confirm('Approve this shift swap?')) this.approvetShiftSwap(e, e.target.value) }}>Approve Swap</Button>
          <Button isColor='danger' value={'deny'}onClick={(e) => { if (window.confirm('Deny this shift swap?')) this.denyShiftSwap(e, e.target.value) }}>Deny Swap</Button>
        </div>)
    }
  }
}
export default ManageApproveSwap
