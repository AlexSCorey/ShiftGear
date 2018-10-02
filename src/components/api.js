
import request from 'superagent/superagent.js'

const domain = 'https://fierce-forest-56311.herokuapp.com'

const api = {
  register: (name, password, email, phoneNum) => {
    return request.post(`${domain}/users`)
      .send({ 'name': `${name}`,
        'email': `${email}`,
        'password': `${password}`,
        'phone_number': `${phoneNum}` })
      .then(userToken =>
        userToken.body.user.api_token)
  },
  getCalendar: () => {
    return request.get(`${domain}/calendars`)
      .set('Authorization', `Bearer ${userToken}`)
      .then(res => res.body)
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
