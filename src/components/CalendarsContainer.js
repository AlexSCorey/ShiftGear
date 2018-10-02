import React, { Component } from 'react'
import api from './api'
import { Button } from 'bloomer'
import update from 'immutability-helper'
import CalendarList from './CalendarList'

class CalendarsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calendarsOwned: [],
      isLoading: true,
      isEditing: false,
      isDeleting: false
    }

    this.editCalendar = this.editCalendar.bind(this)
    this.deleteCalendar = this.deleteCalendar.bind(this)
  }

  componentDidMount () {
    this.getCalendars()
  }
  getCalendars () {
    api.getCalendar().then(calendars => {
      let owned = calendars.owned_calendars
      this.setState({ calendarsOwned: owned })
    })
    console.log(this.state.calendarsOwned)
  }
  // getQuizzes () {
  //   apiCalls.getQuizzes().then(quizzes => {
  //     this.setState({ quizzes })
  //   })
  // }
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
