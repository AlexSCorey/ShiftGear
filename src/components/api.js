
import request from 'superagent/superagent.js'

const domain = 'https://fierce-forest-56311.herokuapp.com'

let userToken

const api = {
  register: (name, password, email, phoneNum) => {
    return request.post(`${domain}/users`)
      .send({ 'name': `${name}`,
        'email': `${email}`,
        'password': `${password}`,
        'phone_number': `${phoneNum}` })
      .then(userToken =>
        userToken.body.user.api_token)
      .then(api.login(email, password))
      .then(api.setUserToken(userToken.body.user.api_token))
  },
  login: (email, password) => {
    return request.post(`${domain}/logins`)
      .send({ 'email': `${email}`,
        'password': `${password}` })
      .then(response =>
        response.body.token)
      .then(token => {
        api.setUserToken(token)
        return { userToken }
      })
  },
  newUserRegistrationCompletion: (name, password, id) => {
    return request.post(`${domain}/invitations/complete`)
      .set('Authorization', `Bearer ${id}`)
      .send({ 'name': `${name}`,
        'password': `${password}` })
      .then(res => res.body.user.api_token)
      .then(token => {
        api.setUserToken(token)
        return { userToken }
      })
  },
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
  },
  getUsers: (id) => {
    return request.get(`${domain}/calendars/${id}/users`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => response.body)
  },
  getCalendars: () => {
    return request.get(`${domain}/calendars`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => response.body)
  },
  updateCalendar: (calendar) => {
    return request.put()
      .set('Authorization', `Bearer ${userToken}`)
      .send(this.calendar.id(calendar))
      .then(res => res.body.calendars)
  },
  createNewCalendar: (title, timeZone, numberOfShifts, dailyWorkLimit, weeklyWorkLimit) => {
    timeZone = 'Central Time (US & Canada)'
    return (request.post(`${domain}/calendars`))
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'name': `${title}`,
        'time_zone': `${timeZone}`,
        'employee_hour_threshold_daily': `${dailyWorkLimit}`,
        'employee_hour_threshold_weekly': `${weeklyWorkLimit}` })
      .then(res => res.body)
  },
  deleteCalendar: (id) => {
    return request.delete(`${domain}/calendars/${id}`)
      .set('Authorization', `Bearer ${userToken}`)

      .then(res => res.body)
      )
  },
  deleteEmployee: (employeeId, calendarId) => {
    console.log('delete employee', employeeId)
    console.log('calendarId', calendarId)
    return request.delete(`${domain}/calendars/${calendarId}/users/${employeeId}/role`)
      .set('Authorization', `Bearer ${userToken}`)
      // .send({ 'name': `${name}`,
      //   'password': `${password}` })
      .then(res => res.body.user.api_token)
  },
  newUserRegistrationCompletion: (name, password, id) => {
    return request.post(`${domain}/invitations/complete`)
      .set('Authorization', `Bearer ${id}`)
      .send({ 'name': `${name}`,
        'password': `${password}` })
      .then(res => res.body.user.api_token)

  },
  addEmployeeToCalendar: (role, email, id) => {
    return request.post(`${domain}/calendars/${id}/invitation`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'email': `${email}`,
        'role': `${role}` })
      .then(response => response.body)
  },
  createShift: (startDateTime, endDateTime, calendarId, numOfShifts, published) => {
    return request.post(`${domain}/calendars/${calendarId}/shifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'start_time': `${startDateTime}`,
        'end_time': `${endDateTime}`,
        'calendar_id': `${calendarId}`,
        'capacity': `${numOfShifts}`,
        'published': `${published}` })
      .then(res => res.body)
  },
  getShifts: (id) => {
    return request.get(`${domain}/calendars/${id}/shifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  }
}

export default api
