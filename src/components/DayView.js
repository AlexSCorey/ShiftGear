import React, { Component } from 'react'
import { Label, Input, Button } from 'bloomer'
import moment from 'moment'

import api from './api'
class DayView extends Component {
  constructor () {
    super()
    this.state = {
      note: ''
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    const { note } = this.state
    const { id, date } = this.props
    let formattedDate = moment(new Date(date)).format('YYYY-MM-DD')
    // console.log(formattedDate, 'date')
    // console.log(id, 'id')
    api.createNote(note, id, formattedDate)
      .then(res => res)
  }
  render () {
    let { id, date } = this.props
    return (<div>
      <h2>{moment(date).format('ddd, Do')}</h2>
      <div>{id}</div>
      <Label>Note:
        <Input type='textarea' onChange={e => this.setState({ note: e.target.value })} required />
      </Label>
      <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
    </div>)
  }
}
export default DayView
