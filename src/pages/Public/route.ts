import routeConstants from '../../constants/routes'
import Public from '.'
import MainRoute from './pages/Main/route'
import FavoritesRoute from './pages/Favorites/route'

export default {
  ...routeConstants.PUBLIC.routeOptions,
  Component: Public,
  routes: [MainRoute, FavoritesRoute],
}
