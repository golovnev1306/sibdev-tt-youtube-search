import React, { FC } from 'react'
import { RoutesMap } from 'components/common'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAuthToken } from 'selectors'
import Header from './Header'
import { AppState, RouteType } from '../../../types'

type OwnProps = {
  routes: RouteType[]
} & MapStateProps

const Public: FC<OwnProps> = ({ routes, authToken }) => {
  if (authToken) {
    return (
      <>
        <Header />
        <RoutesMap routes={routes} />
      </>
    )
  }

  return (
    <Redirect
      to="/auth"
    />
  )
}

type MapStateProps = {
  authToken: string
}

const mapStateToProps = (state: AppState) => ({
  authToken: getAuthToken(state),
})

export default connect<MapStateProps, {}, {}, AppState>(mapStateToProps)(Public)
