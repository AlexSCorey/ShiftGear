
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
      .then(res => res.body)
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
      .then(res => res.body)
  },
  getMySchedule: () => {
    console.log(userToken, 'userToken')
    return request.get(`${domain}/myschedule/`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        return (res.body.shifts)
      })
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
      .then(res => res.body)
  },
  getNotes: (id, today) => {
    return request.get(`${domain}/calendars/${id}/notes?start_date=${today}&end_date=${today}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  getShiftsForADay: (calId, id) => {
    return request.get(`${domain}/calendars/${calId}/shifts?start_date=${id}&end_date=${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  updateShifts: (id, startTime, endTime, capacity) => {
    return request.post(`${domain}/calendars/${id}/shifts/`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'capacity': `${capacity}`,
        'calendar_id': `${id}`,
        'start_time': `${startTime}`,
        'end_time': `${endTime}` })
  },
  getStaff: (id, shiftsId) => {
    return request.get(`${domain}/calendars/${id}/shifts/${shiftsId}/users`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        return (res.body)
      })
  },
  removeStaffFromShift: (calendarID, shiftsId, userID) => {
    return request.delete(`${domain}/calendars${calendarID}/shifts/${shiftsId}/usershifts/${userID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  assignStaff: (userID, id, shiftsId) => {
    return request.post(`${domain}/calendars/${id}/shifts/${shiftsId}/usershifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        'user_id': `${userID}`,
        'shift_id': `${shiftsId}`,
        'calendar_id': `${id}`
      })
      .then(res => {
        return (res.body)
      })
  },
  getShiftSwapIndex: (id) => {
    return request.get(`${domain}/calendars/${id}/swaps`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body, 'res')
  },
  acceptShiftSwap: (id, swapID) => {
    return request.patch(`${domain}/calendars/${id}/swaps/${swapID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body, 'res')
  },
  approveShiftSwap: (response, token) => {
    return request.patch(`${domain}/swaps/complete`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 'decision': `${response}` })
  },
  requestPasswordReset: (email) => {
    return request.post(`${domain}/password/forgot `)
      .send({ 'email': `${email}` })
      .then(res => res)
  },
  resetPassword: (email, password, token) => {
    return request.post(`${domain}/password/reset`)
      .send({ 'email': `${email}`,
        'password': `${password}`,
        'token': `${token}` })
      .then(res => res.body)
  },
  editCalendar: (id, name, timeZone, employeeHourThresholdDaily, employeeHourThresholdWeekly,
    dlts) => {
    return request.patch(`${domain}/calendars/${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'name': `${name}`,
        'time_zone': `${timeZone}`,
        'employee_hour_threshold_daily': `${employeeHourThresholdDaily}`,
        'employee_hour_threshold_weekly': `${employeeHourThresholdWeekly}`,
        'daylight_savings': `${dlts}` })
      .then(res => res.body)
  },
  copyPasteWeek: (id, startWeek, endWeek, copyWeekStart) => {
    return request.post(`${domain}/calendars/${id}/copy?start_date=${startWeek}&end_date=${endWeek}&target_date=${copyWeekStart}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        return (res.body)
      })
  },
  updateProfile: (name, password, email, phoneNum) => {
    return request.patch(`${domain}/update`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'name': `${name}`,
        'password': `${password}`,
        'email': `${email}`,
        'phone_number': `${phoneNum}` })
      .then(res => res.body)
  },
  requestAvailability: (id, thisWeek, nextWeek) => {
    return request.post(`${domain}/calendars/${id}/availability_processes`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ 'start_date': `${thisWeek}`,
        'end_date': `${nextWeek}` })
      .then(res => {
        return res.body
      })
  },
  getAvailabilityRequests: (id, token) => {
    return request.get(`${domain}/calendars/${id}/availability_response`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        return res.body
      })
  },
  submitRequestAvailbility: (availabilitiesResponses, token, id) => {
    return request.patch(`${domain}/calendars/${id}/availability_response`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 'responses': availabilitiesResponses })
      .then(res => {
        return res.body
      })
  },
  assignShifts: (id, shiftID) => {
    return request.post(`${domain}/calendars/${id}/availability_processes/${shiftID}/assign_shifts`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        return (res.body)
      })
  }
}
export default api
