import routeConstants from '../../constants/routes'
import Authorization from '.'

export default {
  ...routeConstants.AUTHORIZATION.routeOptions,
  Component: Authorization,
}
