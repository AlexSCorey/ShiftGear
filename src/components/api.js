
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
  getCalendar: () => {
    // console.log(userToken, 'usertoken')
    return request.get(`${domain}/calendars`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(response => response.body)
  },
  updateCalendar: (calendar) => {
    return request.put()
      .set('Authorization', `Bearer ${userToken}`)
      .send(this.calendar.id(calendar))
      .then(res => res.body.calendars)
      // not sure why I need this
      // .then(createdCalendar => {
      //   return Object.assign({}, calendar, createdCalendar)
      // })
  },
  deleteCalendar (calendar) {
    return request.delete()
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => {
        if (res.body.numDeleted > 0) {
          return true
        } else {
          return false
        }
      })
  }
}

export default api
