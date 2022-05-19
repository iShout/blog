import axios from 'axios'

class GlobalReq {
  constructor() {
    this.loginURl = 'http://localhost:3000/login/'
  }

  async verifyUser(token) {
    const res = await axios.post(this.loginURl + 'verifyUser', {token})
    return res
  }
}

export default {
  GlobalReq,
}
