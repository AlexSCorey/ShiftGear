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
    this.getNotes()
  }
  getNotes () {
    let { id, date } = this.props
    let today = moment(date).format('YYYY-MM-DD')
    api.getNotes(id, today)
      .then(res => {
        this.setState({ employeeNotes: res,
          loaded: true })
      })
  }
  render () {
    let { employeeNotes, loaded } = this.state
    let { date } = this.props
    if (loaded) {
      if (employeeNotes.notes.length > 0) {
        return (<div>
          <div className='itemList1'>{moment(date).format('ddd, Do')}</div>
          <div>
            {employeeNotes.notes.map((note) =>
              <div key={note.note_id} className='container'>
                <div className='itemList3'><strong>{note.user_name}: </strong>{note.text}</div>
              </div>
            )}
          </div>
        </div>)
      } else {
        return (<div />)
      }
    } else {
      return (<div />)
    }
  }
}
export default Notes
