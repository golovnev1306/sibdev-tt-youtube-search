import routeConstants from 'constants/routes'
import Main from '.'

export default {
  ...routeConstants.PUBLIC.subRoutes?.MAIN.routeOptions,
  Component: Main,
}
