import React, { Component } from 'react'

import api from './api'

class SingleShiftView extends Component {
  constructor () {
    super()
    this.state = {
      assignedUsers: [],
      unassignedUsers: []
    }
  }
  componentDidMount () {
    this.getStaff()
  }
  getStaff () {
    let { id, shiftsId } = this.props
    console.log(id, ' cal id')
    console.log(shiftsId, 'shiftsId')
    api.getStaff(id, shiftsId)
      .then(res => {
        this.setState({ assignedUsers: res.assigned_users,
          unassignedUsers: res.unassigned_users })
      })
  }
  render () {
    let { assignedUsers, unassignedUsers } = this.state
    if (assignedUsers.length > 0) {
      return (
        <div>
          <div>Assigned Staff</div>
          <div>{assignedUsers.map((user) =>
            <div>{user.name}</div>
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
