import globalReqs from '@/components/apis/globalReq.js'
const gloRequests = new globalReqs.GlobalReq()
export default function ({ app, $axios, store, route, redirect }) {
  app.router.beforeEach((to, from, next) => {
    const adminReg = /\/admin/i
    if (adminReg.test(to.fullPath)) {
      const token = window.localStorage.getItem('token')
      gloRequests.verifyUser(token).then((res) => {
        if (res.data.success) {
          next()
        } else {
          next({ path: '/loginPage', query: { toPath: to.fullPath } })
        }
      })
    } else {
      next()
    }
  })
}
