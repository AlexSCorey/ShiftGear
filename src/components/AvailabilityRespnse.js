import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import api from './api'
import { Button } from 'bloomer'
class AvailabilityResponse extends Component {
  constructor () {
    super()
    this.state = {
      availabilityRequests: {},
      loaded: false,
      availabilities: [],
      responseComplete: false
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
        console.log('res', res)
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
    let { token, id } = this.props
    let availabilitiesResponses = {}
    this.state.availabilities.forEach((availability) => {
      availabilitiesResponses[availability.id] = availability.available
    })
    api.submitRequestAvailbility(availabilitiesResponses, token, id)
      .then(res => {
        this.setState({ responseComplete: true })
      })
  }
  render () {
    let { loaded, availabilities, availabilityRequests, responseComplete } = this.state
    if (loaded) {
      return (<div>
        <div>{availabilityRequests.availability_process.calendar_name}</div>
        {availabilities.map((request) =>
          <div key={request.id}>
            <div>{moment(request.start_time).format('MMM Do, YYYY')}</div>
            <div>Start:{moment(request.start_time).format('h:mma')}</div>
            <div>End: {moment(request.end_time).format('h:mma')}</div>
            <div>
              <Button className={request.available ? 'request-available-btn' : ''} name='availability' value={request.id} isActive='true'onClick={e => this.acceptRequest(e, e.target.value)}>I'm Available</Button>
              <Button className={request.available ? '' : 'request-unavailable-btn'} name='availability' value={request.id} isActive='true' onClick={e => this.denyRequest(e, e.target.value)}>Not Available</Button>
            </div>
          </div>
        )}
        <Button onClick={e => this.submitForm(e)}>Submit</Button>
      </div>)
    } else if (responseComplete) {
      return (<div>Thank you for submitting your availability!<Link to='/login'>Go To Login</Link>
      </div>)
    } else {
      return (<div class='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>)
    }
  }
}
export default AvailabilityResponse
