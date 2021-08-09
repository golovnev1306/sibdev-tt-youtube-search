import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AppState } from 'types'
import { getAuthToken } from 'selectors'
import { Col, Row } from 'antd'
import logo from 'sibdev-logo.png'
import AuthForm from './AuthForm'

const Auth: FC<MapStateProps> = ({ authToken }) => {
  if (!authToken) {
    return (
      <div className="app__auth auth">
        <div className="auth__inner">
          <Row>
            <Col span={24}>
              <div className="auth__logo">
                <img className="auth__logo-img" src={logo} alt="sibdev logo" />
              </div>
            </Col>
            <Col span={24}>
              <h2 className="auth__title">Вход</h2>
            </Col>
            <Col span={24}>
              <AuthForm />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  return (
    <Redirect to="/" />
  )
}

type MapStateProps = {
  authToken: string
}

const mapStateToProps = (state: AppState) => ({
  authToken: getAuthToken(state),
})

export default connect<MapStateProps, {}, {}, AppState>(mapStateToProps)(Auth)
