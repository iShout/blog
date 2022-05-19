<template>
  <div style="width: 100%; min-height: 100%; padding-top: 48px">
    <el-card class="article-list">
      <div slot="header" class="clearfix">
        <span>article-list</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >expand
        </el-button>
      </div>
      <div>
        <ul>
          <li
            v-for="article in articles"
            :key="article"
            style="margin-bottom: 18px"
          >
            <p class="titles" @click="clickTitle">{{ article }}</p>
          </li>
        </ul>
      </div>
    </el-card>
    <article
      id="article"
      style="width: 60%; height: 100%; margin: 0 auto"
      class="markdown-body"
    ></article>
    <div class="article-opts">
      <el-tooltip effect="light" placement="left" content="编辑当前文章">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="articleOpt('modify')"
        ></el-button
      ></el-tooltip>
      <br />
      <el-tooltip effect="light" placement="left" content="添加新的文章">
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="articleOpt('addNew')"
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import articles from '@/components/apis/articlesRequest.js'
import globalReqs from '@/components/apis/globalReq.js'
import 'github-markdown-css/github-markdown.css'
export default {
  name: 'BlogPage',
  data() {
    return {
      articlesReq: null,
      globalReq: null,
      articles: [],
      currentArticle: '',
    }
  },
  beforeMount() {
    this.articlesReq = new articles.ArticlesRequest()
    this.globalReq = new globalReqs.GlobalReq()
  },
  mounted() {
    this.articlesReq.getArticlesList().then((data) => {
      this.articles = data.data
      this.articlesReq.getArticleDetail(this.articles[0]).then((data) => {
        this.appendArticle(data.data)
        this.currentArticle = this.articles[0]
      })
    })
  },
  methods: {
    appendArticle(mdText) {
      document.getElementById('article').innerHTML = this.$md.render(mdText)
    },
    clickTitle(e) {
      this.articlesReq.getArticleDetail(e.target.innerText).then((data) => {
        this.appendArticle(data.data)
        this.currentArticle = e.target.innerText
      })
    },
    articleOpt(type) {
      this.globalReq.verifyUser().then((res) => {
        switch (type) {
          case 'modify':
            this.$router.push({
              path: '/admin/editBlog',
              query: { title: this.currentArticle },
            })
            break
          case 'addNew':
            this.$router.push({ path: '/admin/editBlog' })
            break
          default:
            break
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  width: 240px;
  position: fixed;
  top: 30%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.titles {
  cursor: pointer;
  color: #1890ff;
}
.article-opts {
  position: fixed;
  right: 80px;
  bottom: 24px;
  width: 48px;
  height: 150px;
  button {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }
}
</style>
