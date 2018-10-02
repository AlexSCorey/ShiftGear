import React, { Component } from 'react'
import api from './api'
import {Button} from 'bloomer'
import update from 'immutability-helper'
import CalendarList from './CalendarList'

class CalendarsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendars: [],
      isLoading: true,
      isEditing: false,
      isDeleting: false
    }
    this.getCalendar = this.getCalendar.bind(this)
    this.updateCalendar = this.updateCalendar.bind(this)
    this.editCalendar = this.editCalendar.bind(this)
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }

  componentDidMount () {
    let token = window.localStorage.token
    api.getCalendar(token)
      .then(calendar => this.setState({calendar, isLoading: false}))
  }

  editCalendar (calendar) {
    this.setState(state => {
      return update(state, {
        calendar: { isEditing: true
        }
      })
    }, () => {
      api.updateCalendar(this.state.calendar)
    })
  }

  deleteCalendar (calendar) {
    this.setState({
      isDeleting: true
    })
  }
  render () {
    return (<CalendarList />)
  }
}

export default CalendarsContainer
