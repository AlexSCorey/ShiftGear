import React, { Component } from 'react'
import moment from 'moment'

import api from './api'
import { Button } from 'bloomer'
class AvailabilityResponse extends Component {
  constructor () {
    super()
    this.state = {
      availabilityRequests: {},
      loaded: false,
      responses: []
    }
  }
  componentDidMount () {
    console.log('here')
    this.getAvailabilityRequests()
  }
  getAvailabilityRequests () {
    let { id, token } = this.props
    api.getAvailabilityRequests(id, token)
      .then(res => {
        console.log(res, 'res')
        this.setState({ availabilityRequests: res,
          loaded: true })
      })
  }
  // acceptRequest (e, value) {
  //   e.preventDefault()
  //   let response = { 'id': `${value}`,
  //     'available': true }
  //   this.setState({ availabilityRequest: response })
  // }
  submitResponses () {

  }
  render () {
    let { loaded, availabilityRequests } = this.state
    if (loaded) {
      return (<div>hi
        {availabilityRequests.availability_process.request.responses.map((request) =>
          <div id={request.id}>
            <div>Start: {moment(request.start_time).format('MM-DD-YY hh:mma')}</div>
            <div>End: {moment(request.end_time).format('MM-DD-YY hh:mma')}</div>
            <Button value={request.id} isActive='true'onClick={e => this.acceptRequest(e, e.target.value)}>I'm Available</Button>
            <Button value={request.id} isActive='true' onClick={e => this.denyRequest(e, e.target.value)}>Not Available</Button>
          </div>
        )}
        <Button>Submit</Button>
      </div>)
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default AvailabilityResponse
