export default function ({ app, $axios, store, route, redirect }) {
  app.router.beforeEach((to, from, next) => {
    const adminReg = /\/admin/i
    if (adminReg.test(to.fullPath) && !store.state.token) {
      next({ path: '/loginPage', query: { toPath: to.fullPath } })
    } else next()
  })
}