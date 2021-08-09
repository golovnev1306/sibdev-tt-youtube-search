import PublicRoute from './pages/Public/route'
import AuthorizationRoute from './pages/Authorization/route'
import { RouteType } from './types'

// route with '/' path must be last
export default [
  AuthorizationRoute, PublicRoute,
] as RouteType[]
