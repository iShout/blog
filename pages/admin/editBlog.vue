<template>
  <div class="page-basic">
    <div class="article-opts">
      <div style="float: right">
        <el-popconfirm
          v-if="isEdit"
          title="当前操作不可撤回，确定要删除吗？"
          icon-color="red"
          confirm-button-text="删"
          cancel-button-text="不了"
          icon="el-icon-info"
          @confirm="deleteArticle"
        >
          <el-button
            slot="reference"
            style="margin-right: 8px"
            type="danger"
            plain
            >删除文章</el-button
          >
        </el-popconfirm>
        <el-button
          type="primary"
          plain
          @click="isEdit ? updateArticle() : (dialogVisible = true)"
          >{{ isEdit ? '提交修改' : '提交文章' }}</el-button
        >
      </div>
    </div>
    <div class="mavon-editor">
      <mavon-editor
        ref="mdEditor"
        v-model="handbook"
        style="width: 100%; height: 100%"
        :toolbars="markdownOption"
        :html="false"
        :scroll-style="true"
        class="markdown-body"
      ></mavon-editor>
    </div>
    <el-dialog
      title="文章详细信息"
      :visible.sync="dialogVisible"
      width="30%"
      destroy-on-close
    >
      <el-form
        ref="articleDetails"
        label-width="80px"
        :model="articleDetails"
        size="small"
      >
        <el-form-item label="文章标题" required>
          <el-input v-model="articleDetails.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitArticle('articleDetails')"
          >上传</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import article from '@/components/apis/articlesRequest.js'
export default {
  name: 'EditBlog',
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        readmodel: true, // 沉浸式阅读
        underline: true, // 下划线
        strikethrough: true, // 中划线
        fullscreen: true, // 全屏编辑
        subfield: true, // 单双栏模式
        save: true, // 保存（触发events中的save事件）
        articleReq: null,
      },
      handbook: '',
      dialogVisible: false,
      articleDetails: {
        title: '',
        content: null,
      },
      isEdit: JSON.stringify(this.$route.query) !== '{}',
    }
  },
  beforeMount() {
    this.articleReq = new article.ArticlesRequest()
  },
  mounted() {
    // 根据传入的title查询文章详情
    if (this.isEdit) {
      this.articleReq.getArticleDetail(this.$route.query.title).then((data) => {
        this.handbook = data.data
      })
    }
  },
  methods: {
    // 提交新文章
    submitArticle(formName) {
      this.articleDetails.content = this.handbook
      this.articleReq.uploadArticle(this.$refs[formName].model).then((data) => {
        this.dialogVisible = false
        this.afterDone('提交成功')
      })
    },
    // 删除文章
    deleteArticle() {
      this.articleReq.deleteArticle(this.$route.query.title).then((data) => {
       this.afterDone('删除成功')
      })
    },
    // 提交修改内容
    updateArticle() {
      this.articleReq
        .updateArticle(this.$route.query.title, this.handbook)
        .then((data) => {
          this.afterDone('修改成功')
        })
    },

    // 操作完成之后的统一操作
    afterDone(msgText) {
      this.$message({
        message: msgText,
        type: 'success',
      })
      this._.delay(() => {
        this.$router.push("/functionPages/blogPage")
      }, 1000)
    },
  },
}
</script>
<style lang="less" scoped>
.page-basic {
  width: 100%;
  height: 100%;
  padding: 24px;
}
.mavon-editor {
  width: 100%;
  height: calc(100% - 48px);
}

.article-opts {
  width: 100%;
  height: 48px;
}
</style>
