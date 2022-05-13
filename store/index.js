export const state = ()=>({
  moduleTitle:null,
  siteName:'UNDEFINED'
})

export const mutations = {
  setTitle(state,text){
    state.moduleTitle = text
  }
}