import { store } from '@/store/store'

export default (req, res, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}
