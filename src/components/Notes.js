import React, { Component } from 'react'

import api from './api'
import moment from 'moment'
// import { Link } from 'react-router-dom'

class Notes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employeeNotes: {},
      loaded: false
    }
    this.getNotes = this.getNotes.bind(this)
  }
  componentDidMount () {
    console.log('here')
    this.getNotes()
  }
  getNotes () {
    console.log('here')
    let { id, date } = this.props
    let today = moment(date).format('YYYY-MM-DD')
    api.getNotes(id, today)
      .then(res => {
        console.log(res, 'res body')
        this.setState({ employeeNotes: res,
          loaded: true })
      })
  }
  render () {
    let { employeeNotes, loaded } = this.state
    if (loaded) {
      return (<div>
        <div>Notes:</div>
        <div>
          {employeeNotes.notes.map((note) =>
            <div>
              <div>{note.user_name}: </div>
              <div>{note.text}</div>
            </div>
          )}
        </div>
      </div>)
    } else {
      return (<div>loading</div>)
    }
  }
}
export default Notes
