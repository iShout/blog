<template>
  <div id="picMarkdown" style="width: 80%; height: 100%" class="markdown-body">
  </div>
</template>
<script>
import 'github-markdown-css/github-markdown.css'

export default {
  name: 'PicMarkdown',
  data(){
    return{
      mdText: "\n\n>笔记&博客～\n>\n>`No Meaning`\n\n```javascript\nArray.prototype.myFilter = function (func,context) {\n  context = context || this\n  let res = []\n  this.map((item,index,arr)=>{\n  if(func.call(context,item,index,arr)){\n    res.push(item)\n    }\n  })\nreturn res\n}\n```"
    }
  },
  mounted(){
    document.getElementById('picMarkdown').innerHTML = this.$md.render(this.mdText)
  }
}
</script>

<style lang="less" scoped></style>
