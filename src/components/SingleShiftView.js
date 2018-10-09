import React, { Component } from 'react'
import { Delete, Button } from 'bloomer'

import api from './api'

class SingleShiftView extends Component {
  constructor () {
    super()
    this.state = {
      assignedUsers: [],
      unassignedUsers: [],
      msg: null
    }
  }
  componentDidMount () {
    console.log(this.props)
    this.getStaff()
  }
  getStaff () {
    let { id, shiftsId } = this.props
    api.getStaff(id, shiftsId)
      .then(res => {
        this.setState({ assignedUsers: res.assigned_users,
          unassignedUsers: res.unassigned_users })
      })
  }
  removeStaff (e, userID, userName) {
    e.preventDefault()
    let { id, shiftsId } = this.props
    let calendarID = id
    api.removeStaffFromShift(calendarID, shiftsId, userID)
      .then(res => {
        this.setState({ msg: `You Successfully removed ${userName}` })
      })
  }
  assignStaff (value) {
    let { id, shiftsId } = this.props
    api.assignShift(value, id, shiftsId)
      .then(res => {
        window.alert(res)
      })
  }
  render () {
    let { assignedUsers, unassignedUsers } = this.state
    if (assignedUsers.length > 0) {
      return (
        <div>
          <div>Assigned Staff</div>
          <div>{assignedUsers.map((user) =>
            <div>
              <Button onClick={e => this.requestSwap(e)}>Request Swap</Button>
              <div>{user.name}
                <Delete userId={user.id} onClick={e => this.removeStaff(e, user.id, user.name)} />
              </div>
            </div>
          )}</div>
          <div>
            <div>Unassigned Staff</div>
            <div>{unassignedUsers.map((user) =>
              <div>{user.name}
                <Button type='checkbox' value={user.id} onClick={e => this.assignStaff(e.target.value)}>Assign</Button>
              </div>
            )}</div>
          </div>
        </div>
      )
    } else {
      return (<div>No Staff Assigned to This Shift</div>)
    }
  }
}
export default SingleShiftView
