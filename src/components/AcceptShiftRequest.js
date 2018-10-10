import React, { Component } from 'react'
import { Button } from 'bloomer'
import moment from 'moment'

import api from './api'

class AcceptShiftRequest extends Component {
  constructor () {
    super()
    this.state = {
      shiftSwapsIndex: {},
      loaded: false
    }
  }
  componentDidMount () {
    this.getShiftSwapIndex()
  }
  getShiftSwapIndex () {
    let { id } = this.props
    api.getShiftSwapIndex(id)
      .then(res => {
        this.setState({ shiftSwapsIndex: res,
          loaded: true })
      })
  }
  acceptShiftSwap (e, shiftID) {
    e.preventDefault()
    let { id } = this.props
    api.acceptShiftSwap(id, shiftID)
      .then(res => window.alert('Swap sent for approval by manager'))
  }
  approveShiftSwap () {
    api.approveRequest()
  }
  render () {
    let { shiftSwapsIndex, loaded } = this.state
    if (loaded) {
      if ((shiftSwapsIndex.roles.indexOf('owner') > -1) || (shiftSwapsIndex.roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div className='itemList1'> Click on a Shift to Accept It</div>
            <div className='itemList'>{shiftSwapsIndex.swaps.map((shiftSwap) => {
              if (shiftSwap.accepting_user) {
                return (<div>
                  <div key={shiftSwap.id}>
                    <div id={shiftSwap.requesting_user.id}>Requested By:{shiftSwap.requesting_user.name}</div>
                    <div id={shiftSwap.accepting_user.id}>Accepted By:{shiftSwap.accepting_user.name}</div>
                    <Button isColor='danger' isStatic='false' isOutlined='true' value={shiftSwap.id}
                      onClick={(e) => { if (window.confirm('Click to approve this shift swap.')) this.approveShiftSwap() }}>
                      <div>
                        {moment(shiftSwap.shift_start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift_end_time).format('MMM Do YYYY hh:mm a')}
                      </div>
                    </Button>
                  </div>
                </div>)
              } else {
                return (
                  <div>
                    <div key={shiftSwap.id}>
                      <Button isOutlined='success' value={shiftSwap.id}
                        onClick={(e) => { if (window.confirm('Accept this shift?')) this.acceptShiftSwap(e, e.target.value) }}
                      >{moment(shiftSwap.shift_start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift_end_time).format('MMM Do YYYY hh:mm a')}</Button>
                    </div>
                  </div>)
              }
            })}
            </div>
          </div>
        )
      } else if (shiftSwapsIndex.roles.indexOf('employee') > -1) {
        return (
          <div>
            <div className='itemList1'>Click on a Shift to Accept It</div>
            <div className='itemList1'>
              {shiftSwapsIndex.swaps.map((shiftSwap) => {
                if (shiftSwap.accepting_user) {
                  return (<div>
                    <div key={shiftSwap.id}>
                      <Button disabled value={shiftSwap.id}
                        onClick={(e) => { (window.confirm('This shift is pending approval and cannot be selected.')) }}
                      >{moment(shiftSwap.shift_start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift_end_time).format('MMM Do YYYY hh:mm a')}</Button>
                    </div>
                  </div>)
                } else {
                  return (
                    <div>
                      <div key={shiftSwap.id}>
                        <Button isOutlined='success' value={shiftSwap.id}
                          onClick={(e) => { if (window.confirm('Accept this shift?')) this.acceptShiftSwap(e, e.target.value) }}
                        >{moment(shiftSwap.shift_start_time).format('MMM Do YYYY hh:mm a')} - {moment(shiftSwap.shift_end_time).format('MMM Do YYYY hh:mm a')}</Button>
                      </div>
                    </div>)
                }
              })}
            </div>
          </div>
        )
      } else {
        return (<div>loading</div>)
      }
    } else {}
    return (<div>loading</div>)
  }
}
export default AcceptShiftRequest
