import React, { Component } from 'react'
import api from './api'
import {Button} from 'bloomer'
import request from 'superagent/superagent.js'
import update from 'immutability-helper'

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
    api.getCalendar(this.props.id)
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
