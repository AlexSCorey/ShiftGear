import React, { Component } from 'react'
import { Delete } from 'bloomer'

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
  render () {
    let { assignedUsers, unassignedUsers } = this.state
    if (assignedUsers.length > 0) {
      return (
        <div>
          <div>Assigned Staff</div>
          <div>{assignedUsers.map((user) =>
            <div>{user.name}
              <Delete userId={user.id} onClick={e => this.removeStaff(e, user.id, user.name)} />
            </div>
          )}</div>
          <div>
            <div>Unassigned Staff</div>
            <div>{unassignedUsers.map((user) =>
              <div>{user.name}</div>
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
