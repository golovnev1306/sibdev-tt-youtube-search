import { Menu } from 'antd'
import React, { FC, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import routes from 'constants/routes'
import logo from 'sibdev-logo.png'
import { getMapLinksByCurrentRoute } from 'utils'
import { connect } from 'react-redux'
import { AppDispatch } from '../../../types'
import { logout } from '../../../redux/reducers/authReducer'

const Header: FC<MapDispatchProps> = ({ logoutUser }) => {
  const { subRoutes } = routes.PUBLIC
  const mapLinks = useMemo(() => (subRoutes ? getMapLinksByCurrentRoute(subRoutes) : []), [])
  const { pathname } = useLocation()

  const logoutHandler = () => {
    logoutUser()
  }
  return (
    <header className="page__header header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <Link className="header__logo-link" to="/"><img className="header__logo-img" src={logo} alt="logo" /></Link>
          </div>
          <Menu className="header__menu menu" theme="light" mode="horizontal" selectedKeys={[pathname]}>
            {mapLinks.map((i) => (
              <Menu.Item key={i.name} className="menu__item">
                <Link to={i.route}>{i.title}</Link>
              </Menu.Item>
            ))}
            <Menu.Item className="menu__item menu__item--logout" onClick={logoutHandler}>Выход</Menu.Item>
          </Menu>
        </div>
      </div>
    </header>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  logoutUser: () => dispatch(logout()),
})

type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(null, mapDispatchToProps)(Header)
