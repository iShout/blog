<template>
  <section class="layout-basic">
    <header>
      <p class="title">Detail</p>
      <p class="crumbs">面包屑占位</p>
    </header>
    <body class="main-content">
      <aside>
        <el-card class="article-list">
          <div slot="header" class="clearfix">
            <span>article-list</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >expand
            </el-button>
          </div>
          <div>
            <ul>
              <li v-for="artical in articals" :key="artical">
                <a href="">{{artical}}</a>
                </li>
            </ul>
          </div>
        </el-card>
      </aside>
      <article></article>
    </body>
  </section>
</template>

<script>
import articals from "@/components/apis/articalsRequest.js"

export default {
  name: 'FunctionPages',
  data() {
    return {
      articalsReq:null,
      articals:[]
    }
  },
  beforeMount(){
    this.articalsReq = new articals.ArticalsRequest()
  },
  mounted() {
    this.articalsReq.getArticals().then(data=>{
      this.articals = data.data.articals
    })
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
a{
  text-decoration:none
}
.title {
  font-size: 43.6px;
  font-weight: bolder;
  display: inline-block;
}
.crumbs {
  display: inline-block;
  margin-left: 24px;
}
.main-content {
  width: 100%;
  height: calc(100% - 61px);
}
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
</style>
