/**
  本地存储
**/
import store from "store";
const USER_KEY = 'user_key'
export default {
  setUser (data) {
    store.set(USER_KEY, data)
  },
  getUser () {
    return store.get(USER_KEY) || {}
  },
  remove () {
    store.remove(USER_KEY)
  }
}