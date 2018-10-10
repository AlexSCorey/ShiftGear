import React, { Component } from 'react'
import { Button } from 'bloomer'
import api from './api'
class ManageApproveSwap extends Component {
  approvetShiftSwap (e, value) {
    let { token } = this.props
    e.preventDefault()
    api.approveRequest(value, token)
  }

  render () {
    return (
      <div>
        <h1>Approve or Deny This Shift Swap</h1>
        <Button isColor='succes' value={'approve'} onClick={(e) => { if (window.confirm('Approve this shift swap?')) this.approvetShiftSwap(e, e.target.value) }}>Approve Swap</Button>
        <Button isColor='danger' value={'deny'}onClick={(e) => { if (window.confirm('Approve this shift swap?')) this.denyShiftSwap(e, e.target.value) }}>Deny Swap</Button>
      </div>)
  }
}
export default ManageApproveSwap
