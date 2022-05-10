import axios from 'axios'
class ArticalsRequest {
  constructor(){
    this.baseURL = 'http://127.0.0.1:4523/mock/958318/'
  }

  async getArticals() {
    const articals = await axios.get(
      this.baseURL+'getArticals'
    )
    return articals
  }
}

export default {
  ArticalsRequest
}