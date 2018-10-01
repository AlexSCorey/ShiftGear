import React, { Component } from 'react'
import {Button} from 'bloomer'
import superagent from 'superagent'
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

  getCalendar () {
    return request.get()
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  }

  componentDidMount () {
    getCalendar(this.props.id)
      .then(calendar => this.setState({ calendar, isLoading: false}))
  }

  updateCalendar (id) {
    this.setState(calendar => {
      return request.put()
        .set('Authorization', `Bearer ${userToken}`)
        .send(this.calendar.id(calendar))
        .then(res => res.body)
        .then(createdCalendar => {
          return Object.assign({}, calendar, createdCalendar)
        })
    })
  }

  editCalendar (id) {
    this.setState(state => {
      return update(state, {
        calendar: { isEditing: true
        }
      })
    }, () => {
      updateCalendar(this.state.calendar)
    })
  }
  // NOT SURE ON THIS ONE
  // deleteCalendar (id) {
  //   return request.delete()
  //     .set('Authorization', `Bearer ${userToken}`)
  //     .then(res => {
  //       if (res.body.numDeleted > 0) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  // }

  render () {
    return (
      <div className='CalendarsContainer'>
        <CalendarsContainer>{this.calendars}</CalendarsContainer>
      </div>

    )
  }
}
