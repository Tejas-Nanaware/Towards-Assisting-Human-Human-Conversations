import { store } from '@/store/store'

export default (req, res, next) => {
  if (store.state.user) {
    next()
  } else {
    next('/login')
  }
}
