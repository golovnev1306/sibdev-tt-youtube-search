import React, {
  ChangeEvent, FC, useState,
} from 'react'
import { connect } from 'react-redux'
import { addFavoriteThunk, deleteFavoriteThunk } from 'redux/reducers/favoritesReducer'
import { FormikHelpers } from 'formik/dist/types'

import {
  AddFavoriteFormFields, AppDispatch, AppState, Favorite, SearchFormFields,
} from 'types'
import { getFavoritesQueries, getVideosQuery } from 'selectors'
import SearchForm from './SearchForm'

type Props = {
  setVideos: (query: string) => void
}

const SearchFormContainer:FC<Props & MapDispatchProps & MapStateProps> = ({
  setVideos, addFavorite, favoritesQueries, deleteFavorite, query,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | undefined>()

  const modalCancelHandler = () => {
    setIsOpenModal(false)
  }

  const submitAddFavorite = async (
    values: Favorite,
    { setSubmitting }: FormikHelpers<AddFavoriteFormFields>,
  ) => {
    await addFavorite(values)
    setSubmitting(false)
    setIsOpenModal(false)
    setIsFavorite(true)
    setCurrentIndex(favoritesQueries.length - 1)
  }

  const submitSearchHandler = async (values: SearchFormFields,
    { setSubmitting }: FormikHelpers<SearchFormFields>) => {
    if (values.searchText) {
      await setVideos(values.searchText)
      setSubmitting(false)
    }
  }

  const onCreateFavorite = async () => {
    setIsOpenModal(true)
  }

  const onDeleteFavorite = async () => {
    if (typeof currentIndex !== 'undefined') {
      await deleteFavorite(currentIndex)
      setIsFavorite(false)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const findCurrentFavorite = favoritesQueries.indexOf(e.currentTarget.value)
    if (findCurrentFavorite !== -1) {
      setIsFavorite(true)
      setCurrentIndex(findCurrentFavorite)
      return
    }
    setIsFavorite(false)
    setCurrentIndex(undefined)
  }

  return (
    <SearchForm
      query={query}
      onDeleteFavorite={onDeleteFavorite}
      onCreateFavorite={onCreateFavorite}
      isFavorite={isFavorite}
      isOpenModal={isOpenModal}
      modalCancelHandler={modalCancelHandler}
      onChangeHandler={onChangeHandler}
      submitAddFavorite={submitAddFavorite}
      submitSearchHandler={submitSearchHandler}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  favoritesQueries: getFavoritesQueries(state),
  query: getVideosQuery(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFavorite: (favorite: Favorite) => dispatch(addFavoriteThunk(favorite)),
  deleteFavorite: (index: number) => dispatch(deleteFavoriteThunk(index)),
})

type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
