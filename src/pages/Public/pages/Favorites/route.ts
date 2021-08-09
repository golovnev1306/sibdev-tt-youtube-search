import routeConstants from 'constants/routes'
import Favorites from '.'

export default {
  ...routeConstants.PUBLIC.subRoutes?.FAVORITES.routeOptions,
  Component: Favorites,
}
