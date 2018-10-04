
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
  setUserToken: (token) => {
    userToken = token
  },
  getUserToken: () => {
    return userToken
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
  createNewCalendar: () => {
    console.log('im here')
    return (request.post(`${domain}/calendars`))
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
  },
  deleteCalendar: (id) => {
    console.log('im here', id)
    return request.delete(`${domain}/calendars/${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => console.log(res.body, 'res')
      )
  },
  newUserRegistrationCompletion: (name, password, id) => {
    return request.post(`${domain}/invitations/complete`)
      .set('Authorization', `Bearer ${id}`)
      .then(res => {
        console.log(res.body)
      })
  },
  addEmployeeToCalendar: (name, email, id, phone) => {
    console.log(id, 'calendar id')
    return request.post(`${domain}/calendars/${id}/invitation`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => response.body)
  }
}

export default api
