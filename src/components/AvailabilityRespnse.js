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
      availabilities: []
    }
  }
  componentDidMount () {
    this.getAvailabilityRequests()
  }
  getAvailabilityRequests () {
    let { id, token } = this.props
    api.getAvailabilityRequests(id, token)
      .then(res => {
        let availabilities = res.availability_process.request.responses
        this.setState({ availabilities: availabilities,
          availabilityRequests: res,
          loaded: true })
      })
  }
  acceptRequest (e, value) {
    e.preventDefault()
    let { availabilities } = this.state
    let availability = availabilities.find((a) => a.id.toString() === value)
    availability.available = true
    this.setState({ availabilities: availabilities })
  }
  denyRequest (e, value) {
    e.preventDefault()
    let { availabilities } = this.state
    let availability = availabilities.find((a) => a.id.toString() === value)
    availability.available = false
    this.setState({ availabilities: availabilities })
  }
  submitForm (e) {
    e.preventDefault()
    console.log(this.state.availabilities, 'availabilities')
  }
  render () {
    let { loaded, availabilities, availabilityRequests } = this.state
    if (loaded) {
      return (<div>
        <div>{availabilityRequests.availability_process.calendar_name}</div>
        {availabilities.map((request) =>
          <div id={request.id}>
            <div>{moment(request.start_time).format('MMM Do, YYYY')}</div>
            <div>Start:{moment(request.start_time).format('h:mma')}</div>
            <div>End: {moment(request.end_time).format('h:mma')}</div>
            <div>{console.log(request.available, 'availabel')}
              <Button className={request.available ? 'request-available-btn' : ''} name='availability' value={request.id} isActive='true'onClick={e => this.acceptRequest(e, e.target.value)}>I'm Available</Button>
              <Button className={request.available ? '' : 'request-unavailable-btn'} name='availability' value={request.id} isActive='true' onClick={e => this.denyRequest(e, e.target.value)}>Not Available</Button>
            </div>
          </div>
        )}
        <Button onClick={e => this.submitForm(e)}>Submit</Button>
      </div>)
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default AvailabilityResponse
