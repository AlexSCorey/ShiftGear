import React, { Component } from 'react'
import { Button } from 'bloomer'
class ManageApproveSwap extends Component {
  render () {
    return (
      <div>
        <Button isColor='succes' onClick={(e) => { if (window.confirm('Approve this shift swap?')) this.approvetShiftSwap(e, e.target.value) }}>Approve Swap</Button>
        <Button isColor='danger' onClick={(e) => { if (window.confirm('Approve this shift swap?')) this.denyShiftSwap(e, e.target.value) }}>Deny Swap</Button>
      </div>)
  }
}
export default ManageApproveSwap
