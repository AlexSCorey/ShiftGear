
import request from 'superagent/superagent.js'

const domain = 'https://fierce-forest-56311.herokuapp.com'

const api = {
  register: (name, username, password, email, phoneNum) => {
    return request.post(`${domain}/users`)
      .send({ 'name': `${name}`,
        'username': `${username}`,
        'email': `${email}`,
        'password': `${password}`,
        'phone': `${phoneNum}` })
      .then(userToken =>
        userToken.body.user.api_token)
  }
}
export default api
