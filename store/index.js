export const state = ()=>({
  moduleTitle:null,
  siteName:'UNDEFINED',
  token:false
})

export const mutations = {
  setTitle(state,text){
    state.moduleTitle = text
  },
  tokenPass(state){
    state.token = true
  }
}