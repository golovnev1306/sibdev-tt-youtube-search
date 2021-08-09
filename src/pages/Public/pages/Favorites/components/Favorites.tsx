import { Col, Empty, Row } from 'antd'
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { getFavorites } from 'selectors'
import {
  AddFavoriteFormFields, AppDispatch, AppState, Favorite, Message,
} from 'types'
import { FormikHelpers } from 'formik/dist/types'
import { deleteFavoriteThunk, editFavoriteThunk } from 'redux/reducers/favoritesReducer'
import { useHistory } from 'react-router-dom'
import { setVideosThunk } from 'redux/reducers/videoReducer'
import { appActions } from 'redux/reducers/appReducer'
import FavoriteItem from './FavoriteItem'

const Favorites: FC<MapStateProps & MapDispatchProps> = ({
  favorites, editFavorite, setVideos, deleteFavorite, setMessage,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const history = useHistory()

  const modalCancelHandler = () => {
    setIsOpenModal(false)
  }

  const clickPerformHandler = async (query: Favorite) => {
    try {
      history.push('/')
      await setVideos(query)
    } catch (e) {
      setMessage({
        text: e.message,
        type: 'error',
      })
    }
  }

  const clickEditHandler = (index: number) => {
    setIsOpenModal(true)
    setSelectedIndex(index)
  }

  const submitEditFavorite = async (
    values: Favorite,
    { setSubmitting }: FormikHelpers<AddFavoriteFormFields>,
  ) => {
    await editFavorite(selectedIndex, values)
    setSubmitting(false)
    setIsOpenModal(false)
  }

  return (
    <main className="app__favorites favorites">
      <div className="container">
        <div className="favorites__inner">
          <Row className="favorites__list">
            <Col span={24}>
              {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                  <FavoriteItem
                    modalCancelHandler={modalCancelHandler}
                    isOpenModal={isOpenModal}
                    favorite={favorite}
                    clickEditHandler={clickEditHandler}
                    clickPerformHandler={clickPerformHandler}
                    deleteFavorite={deleteFavorite}
                    index={index}
                    submitEditFavorite={submitEditFavorite}
                    key={favorite.queryName}
                  />
                ))
              ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="У вас нет избранных запросов" />
              )}

            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = (state: AppState) => ({
  favorites: getFavorites(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  editFavorite: (index: number, favorite: Favorite) => dispatch(editFavoriteThunk(index, favorite)),
  deleteFavorite: (index: number) => dispatch(deleteFavoriteThunk(index)),
  setVideos: (query: Favorite) => dispatch(setVideosThunk(query)),
  setMessage: (message: Message) => dispatch(appActions.setMessage(message)),
})

type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
