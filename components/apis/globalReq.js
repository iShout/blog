import axios from 'axios'

class GlobalReq {
  constructor(){
    this.loginURl ='http://localhost:3000/login/'
  }

  async verifyUser(){
    const res = await axios.get(this.loginURl+'verifyUser',{withCredentials:true})
    return res.data.verify
  }
}

export default {
  GlobalReq
}