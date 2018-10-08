import React, { Component } from 'react'
import { Button } from 'bloomer'
import moment from 'moment'

import api from './api'

class AcceptShiftRequest extends Component {
  constructor () {
    super()
    this.state = {
      shiftSwapsIndex: []
    }
  }
  componentDidMount () {
    this.getShiftSwapIndex()
  }
  getShiftSwapIndex () {
    let { id } = this.props
    api.getShiftSwapIndex(id)
      .then(res => {
        this.setState({ shiftSwapsIndex: res })
      })
  }
  acceptShiftSwap (e, shiftID) {
    e.preventDefault()
    let { id } = this.props
    api.acceptShiftSwap(id, shiftID)
      .then(res => window.alert('Swap sent for approval by manager'))
  }
  render () {
    let { shiftSwapsIndex } = this.state

    return (
      <div>
  Click on a Shift to Accept It
        {shiftSwapsIndex.map((shiftSwap) => {
          if (shiftSwap.accepting_user) {
            return (<div>
              <div key={shiftSwap.id}>
                <Button disabled={shiftSwap.accepting_user} value={shiftSwap.id}
                  onClick={(e) => { if (window.confirm('Accept this shift?')) this.acceptShiftSwap(e, e.target.value) }}
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
    )
  }
}
export default AcceptShiftRequest
