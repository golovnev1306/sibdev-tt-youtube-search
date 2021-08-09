import React, { FC, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { connect } from 'react-redux'
import {
  getAuthUser, getFavorites, getIsInitialized, getMessage,
} from 'selectors'
import { notification } from 'antd'
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import routes from './route'
import { RoutesMap } from './components/common'
import { initialize } from './redux/reducers/appReducer'
import {
  AppDispatch, AppState, Message,
} from './types'

const openNotification = (message: Message) => {
  if (message.text) {
    notification.info({
      message: message.text,
      placement: 'topLeft',
      icon: message.type === 'error' ? <WarningOutlined /> : <CheckCircleOutlined />,
    })
  }
}

const App: FC<MapDispatchProps & MapStateProps> = ({
  initializeApp, isInitialized, favorites, authUser, message,
}) => {
  useEffect(() => {
    openNotification(message)
  }, [message])

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (isInitialized && authUser) {
      localStorage.setItem(authUser, JSON.stringify(favorites))
    }
  }, [favorites])

  return (

    <div className="app">
      {isInitialized ? (
        <Router>
          <RoutesMap routes={routes} />
        </Router>
      ) : (
        <div>Идет загрузка приложения</div>
      )}

    </div>

  )
}

const mapStateToProps = (state: AppState) => ({
  isInitialized: getIsInitialized(state),
  favorites: getFavorites(state),
  authUser: getAuthUser(state),
  message: getMessage(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initializeApp: () => dispatch(initialize()),
})

type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect<MapStateProps, MapDispatchProps, {}, AppState>(
  mapStateToProps, mapDispatchToProps,
)(App)
