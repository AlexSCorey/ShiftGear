import React, { Component } from 'react'

import api from './api'

class DayAlerts extends Component {
  constructor () {
    super()
    this.state = {
      alertsLoaded: false,
      alerts: {}
    }
  }
  componentDidMount () {
    this.getAlerts()
  }
  getAlerts () {
    let { id, date } = this.props
    api.getDailyAlerts(id, date)
      .then(res => {
        console.log(res.alerts)
        this.setState({ alerts: res.alerts })
      })
  }
  render () {
    let { alerts, alertsLoaded } = this.state
    if (alertsLoaded) {
      return (<div>
        <div>Alerts({alerts.daily_hours_threshold.length}):</div>
        {alerts.daily_hours_threshold.map((user) =>
          <div key={user.id}>{user.user_name}</div>
        )}
      </div>)
    } else {
      return (<div />)
    }
  }
}

export default DayAlerts
