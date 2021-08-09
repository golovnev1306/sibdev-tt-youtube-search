import { RouteConstType } from '../types'

export default Object.freeze({
  AUTHORIZATION: {
    title: 'Авторизация',
    routeOptions: {
      path: '/auth',
    },
  },
  PUBLIC: {
    routeOptions: {
      path: '/',
    },
    subRoutes: {
      MAIN: {
        title: 'Поиск',
        routeOptions: {
          path: '/',
          exact: true,
        },
      },
      FAVORITES: {
        title: 'Избранное',
        routeOptions: {
          path: '/favorites',
        },
      },
    },
  },
} as RouteConstType)
