import React, { Component } from 'react'
// import moment from 'moment'
// import DayPickerInput from 'react-day-picker/DayPickerInput'
// import 'react-day-picker/lib/style.css'
import { Button, Label, Input } from 'bloomer'
import { Link } from 'react-router-dom'

import api from './api'

// import { formatDate, parseDate } from 'react-day-picker/moment'
// import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      timeZone: 'Eastern Time',
      dlst: false,
      numberOfShifts: '',
      dailyWorkLimit: '',
      weeklyWorkLimit: '',
      newCalendarId: ''
    }
    // this.handleFromDateChange = this.handleFromDateChange.bind(this)
  }

  submitCalendar (e) {
    let { title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, dlst } = this.state
    e.preventDefault()
    api.createNewCalendar(title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, dlst)
      .then(res => {
        this.setState({ newCalendarId: res.id })
      })
  }
  render () {
    let { title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit, newCalendarId } = this.state
    // const modifiers = { start: from, end: to }
    return (<div >
      <label>Calendar Title
        <input className='input' type='text' value={title} placeholder='Provide calendar Title' onChange={e => this.setState({ title: e.target.value })} />
      </label>
      <Label >Daylight Saving's Time</Label>
      <input type='checkbox' onChange={e => this.setState({ dlst: true })} />
      <Label>Time Zone</Label>
      <select>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Eastern Time (US & Canada)'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Hawaii'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Alaska'}</option>
        <option vvalue={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Pacific Time (US & Canada)'}</option>
        <option value={timeZone} onBlur={e => this.setState({ timeZone: e.target.value })}>{'Central Time (US & Canada)'}</option>
      </select >
      <Label>Number of Shifts
        <Input type='number' placeholder='Must Be a Number' value={numberOfShifts} required onChange={e => this.setState({ numberOfShifts: e.target.value })} />
      </Label>
      <Label>Daily Work Limit
        <Input type='number' placeholder='Optional' value={dailyWorkLimit} onChange={e => this.setState({ dailyWorkLimit: e.target.value })} />
      </Label>
      <Label>Weekly Work Limit
        <Input type='number' placeholder='Optional' value={weeklyWorkLimit} onChange={e => this.setState({ weeklyWorkLimit: e.target.value })} />
      </Label>
      <div>
        <Button to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Submit Calendar</Button>
      </div>
      <Link to={`/Calendar/${newCalendarId}/AddEmployee`}>Add Employees</Link>
    </div>)
  }
  // const = timeZones = ["International Date Line West", "Midway Island", "American Samoa", "Hawaii", "Alaska", "Pacific Time (US & Canada)", "Tijuana", "Mountain Time (US & Canada)", "Arizona", "Chihuahua", "Mazatlan", "Central Time (US & Canada)", "Saskatchewan", "Guadalajara", "Mexico City", "Monterrey", "Central America", "Eastern Time (US & Canada)", "Indiana (East)", "Bogota", "Lima", "Quito", "Atlantic Time (Canada)", "Caracas", "La Paz", "Santiago", "Newfoundland", "Brasilia", "Buenos Aires", "Montevideo", "Georgetown", "Puerto Rico", "Greenland", "Mid-Atlantic", "Azores", "Cape Verde Is.", "Dublin", "Edinburgh", "Lisbon", "London", "Casablanca", "Monrovia", "UTC", "Belgrade", "Bratislava", "Budapest", "Ljubljana", "Prague", "Sarajevo", "Skopje", "Warsaw", "Zagreb", "Brussels", "Copenhagen", "Madrid", "Paris", "Amsterdam", "Berlin", "Bern", "Zurich", "Rome", "Stockholm", "Vienna", "West Central Africa", "Bucharest", "Cairo", "Helsinki", "Kyiv", "Riga", "Sofia", "Tallinn", "Vilnius", "Athens", "Istanbul", "Minsk", "Jerusalem", "Harare", "Pretoria", "Kaliningrad", "Moscow", "St. Petersburg", "Volgograd", "Samara", "Kuwait", "Riyadh", "Nairobi", "Baghdad", "Tehran", "Abu Dhabi", "Muscat", "Baku", "Tbilisi", "Yerevan", "Kabul", "Ekaterinburg", "Islamabad", "Karachi", "Tashkent", "Chennai", "Kolkata", "Mumbai", "New Delhi", "Kathmandu", "Astana", "Dhaka", "Sri Jayawardenepura", "Almaty", "Novosibirsk", "Rangoon", "Bangkok", "Hanoi", "Jakarta", "Krasnoyarsk", "Beijing", "Chongqing", "Hong Kong", "Urumqi", "Kuala Lumpur", "Singapore", "Taipei", "Perth", "Irkutsk", "Ulaanbaatar", "Seoul", "Osaka", "Sapporo", "Tokyo", "Yakutsk", "Darwin", "Adelaide", "Canberra", "Melbourne", "Sydney", "Brisbane", "Hobart", "Vladivostok", "Guam", "Port Moresby", "Magadan", "Srednekolymsk", "Solomon Is.", "New Caledonia", "Fiji", "Kamchatka", "Marshall Is.", "Auckland", "Wellington", "Nuku'alofa", "Tokelau Is.", "Chatham Is.", "Samoa"]
}
export default CreateCalendar
