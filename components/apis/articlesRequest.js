import axios from 'axios'
class ArticlesRequest {
  constructor(){
    this.baseURL = 'http://localhost:3000/article/'
  }

  async getArticleDetail(title) {
    const article = await axios.get(
      this.baseURL+'getArticleDetail',{
        params:{
          title
        },
        timeout:10000
      }
    )
    return article
  }

  async getArticlesList(){
    const articles = await axios.get(
      this.baseURL+'getArticlesList',
      {
        timeout:10000
      }
    )
    return articles
  }

 async uploadArticle(data){
   const res = await axios.post(
      this.baseURL+'uploadArticle',
      data
    )
    return res
  }

  async deleteArticle(title){
    const opt = await axios.delete(
      this.baseURL+'deleteArticle',
      {
        params:{
          title
        },
        timeout:100000
      }
    )
    return opt
  }

  async updateArticle(title,content){
    const opt = await axios.put(
      this.baseURL+'updateArticle',
      {
        data:{
          title,
          content
        },
        timeout:100000
      }
    )
    return opt
  }
}

export default {
  ArticlesRequest
}