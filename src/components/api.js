
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
      .then(res => res.body.user.api_token)
      .then(api.login(email, password))
      // .then(api.setUserToken(res.body.user.api_token))
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
  // newUserRegistrationCompletion: (name, password, id) => {
  //   return request.post(`${domain}/invitations/complete`)
  //     .set('Authorization', `Bearer ${id}`)
  //     .send({ 'name': `${name}`,
  //       'password': `${password}` })
  //     .then(res => res.body.user.api_token)
  //     .then(token => {
  //       api.setUserToken(token)
  //       return { userToken }
  //     })
  // },
  newUserRegistrationCompletion: (name, password, id) => {
    return request.post(`${domain}/invitations/complete`)
      .set('Authorization', `Bearer ${id}`)
      .send({ 'name': `${name}`,
        'password': `${password}` })
      .then(res => res.body.user.api_token)
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
  },
  deleteEmployee: (employeeId, role, calendarId) => {
    return request.delete(`${domain}/calendars/${calendarId}/users/${employeeId}/role`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'role': `${role}` })
      .then(res => console.log(res.body, 'delete employee response'))
  },
  // newUserRegistrationCompletion: (name, password, id) => {
  //   return request.post(`${domain}/invitations/complete`)
  //     .set('Authorization', `Bearer ${id}`)
  //     .send({ 'name': `${name}`,
  //       'password': `${password}` })
  //     .then(res => res.body.user.api_token)
  // },
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
  getWeekShiftInfo: (id, thisWeek, nextWeek) => {
    return request.get(`${domain}/calendars/${id}/summary?start_date=${thisWeek}&end_date=${nextWeek}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body, 'get shifts res')
  },
  getShifts: (id) => {
    return request.post(`${domain}/calendars/${id}/shifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  deleteShift: (id, shiftId) => {
    return request.delete(`${domain}/calendars/${id}/shifts/${shiftId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  createNote: (note, id, date) => {
    return request.post(`${domain}/calendars/${id}/notes`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'text': `${note}`,
        'date': `${date}` })
      .then(res => console.log(res.body))
  },
  getNotes: (id, thisWeek, nextWeek) => {
    request.get(`${domain}/calendars/${id}/summary?start_date=${thisWeek}&end_date=${nextWeek}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  getShiftsForADay: (calId, id) => {
    return request.get(`${domain}/calendars/${calId}/shifts?start_date=${id}&end_date=${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body.shifts)
  },
  updateShifts: (id, shiftId, startTime, endTime, capacity, published) => {
    return request.delete(`${domain}/calendars/${id}/shifts/${shiftId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'id': `${shiftId}`,
        'calendar_id': `${id}`,
        'start_time': `${startTime}`,
        'end_time': `${endTime}`,
        'published': `${published}` })
  },
  getStaff: (id, shiftsId) => {
    // console.log(id, 'id')
    // console.log(shiftsId, 'shiftsId')
    return request.get(`${domain}/calendars/${id}/shifts/${shiftsId}/users`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  removeStaffFromShift: (calendarID, shiftsId, userID) => {
    return request.delete(`${domain}/calendars${calendarID}/shifts/${shiftsId}/usershifts/${userID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  assignShift: (userID, id, shiftsId) => {
    return request.post(`${domain}/calendars/${id}/shifts/${shiftsId}/usershifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        'user_id': `${userID}`,
        'shift_id': `${shiftsId}`
      })
      .then(res => res.body)
  }

  //     POST https://fierce-forest-56311.herokuapp.com/calendars/:calendar_id/shifts/:id/usershifts

  // api_token required (must be owner or manager to create employee shift)

  // required keys:

  // user_id
  // shift_id
}
export default api
