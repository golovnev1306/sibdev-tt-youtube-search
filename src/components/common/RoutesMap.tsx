import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { RouteType } from '../../types'
import NotFound from '../../pages/NotFound'

type OwnProps = {
  routes: RouteType[]
}

const RoutesMap: FC<OwnProps> = ({ routes }) => (
  <Switch>
    { routes.map((route, i) => (
      <Route
        key={i}
        path={route.path}
        exact={route.exact}
        render={(props) => (
          <route.Component {...props} routes={route.routes} />
        )}
      />
    )) }
    <Route component={NotFound} />
  </Switch>
)

export default RoutesMap
