if (module && module.hot) {
  module.hot.accept()
}
import './css/main.scss'
import { debounce } from './utils'
import { observer, Watcher, computed, watch } from './js/vue2.x'
console.log(
  '%cdata对象已挂载至window，可直接访问/修改',
  ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:2.5em'
)
const input = document.querySelector('#input')

const vue2_text = document.querySelector('#vue2>.text>.val')
const vue2_computed_val = document.querySelector('#vue2>.computed>.val')
const vue2_watch_oldVal = document.querySelector('#vue2>.watch>.oldVal')
const vue2_watch_newVal = document.querySelector('#vue2>.watch>.newVal')

const vue3_text = document.querySelector('#vue3>.text>.val')

const Vue2_data = observer({
  msg: 'hello Vue2.x',
})
window.Vue2_data = Vue2_data
console.log('Vue2_data', window.Vue2_data)
const vue2_computed = computed(() => `${Vue2_data.msg}, 是一个computed值`)
watch(
  () => Vue2_data.msg,
  (oldVal, newVal) => {
    vue2_watch_oldVal.innerHTML = oldVal
    vue2_watch_newVal.innerHTML = newVal
  }
)

// const Vue3_data = reactive({
//   msg: 'hellow'
// })
new Watcher(() => {
  vue2_text.innerHTML = Vue2_data.msg
  // vue3_text.innerHTML = Vue3_data.msg
  return 'success'
})
new Watcher(() => {
  vue2_computed_val.innerHTML = vue2_computed.value
})

input.onkeyup = debounce(({ target }) => {
  Vue2_data.msg = target.value
})
