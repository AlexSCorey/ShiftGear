import React, { Component } from 'react'
import { Delete, Button } from 'bloomer'

import api from './api'

class SingleShiftView extends Component {
  constructor () {
    super()
    this.state = {
      assignedUsers: [],
      unassignedUsers: [],
      msg: null,
      loaded: false,
      roles: {}
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
          unassignedUsers: res.unassigned_users,
          roles: res.roles,
          loaded: true })
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
    console.log('im here')
    let { id, shiftsId } = this.props
    api.assignStaff(value, id, shiftsId)
      .then(res => {
        window.alert(res)
      })
  }
  render () {
    let { assignedUsers, unassignedUsers, loaded, roles } = this.state
    if (loaded) {
      if ((roles.indexOf('owner') > -1) || (roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div>Assigned Staff</div>
            <div>{assignedUsers.map((user) =>
              <div>
                <Button onClick={e => this.requestSwap(e)}>Request Swap</Button>
                <div>{user.name}
                  <Delete userid={user.id} onClick={e => this.removeStaff(e, user.id, user.name)} />
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
        return (
          <div>
            <div>Assigned Staff</div>
            <div>{assignedUsers.map((user) =>
              <div>
                <div>{user.name}
                </div>
              </div>
            )}</div>
            <div>
              <div>Unassigned Staff</div>
              <div>{unassignedUsers.map((user) =>
                <div>{user.name}
                </div>
              )}</div>
            </div>
          </div>
        )
      }
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default SingleShiftView
