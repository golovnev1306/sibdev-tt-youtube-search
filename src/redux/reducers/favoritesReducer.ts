import {
  AppDispatch, Favorite, ReturnActionsType,
} from '../../types'
import { appActions } from './appReducer'

const initialState = {
  favorites: [] as Favorite[],
}

type InitialState = typeof initialState

const favoritesReducer = (state = initialState, action: appActionsType): InitialState => {
  switch (action.type) {
    case 'SET_FAVORITES': return {
      ...state,
      favorites: [...action.favorites],
    }
    case 'ADD_FAVORITE': return {
      ...state,
      favorites: [...state.favorites, action.favorite],
    }
    case 'EDIT_FAVORITE':
      // eslint-disable-next-line no-case-declarations
      const newState = [...state.favorites]
      newState[action.payload.index] = action.payload.favorite
      return {
        ...state,
        favorites: newState,
      }
    case 'DELETE_FAVORITE':
      // eslint-disable-next-line no-case-declarations
      const newFavorites = [...state.favorites]
      newFavorites.splice(action.index, 1)
      return {
        ...state,
        favorites: newFavorites,
      }
    default: return state
  }
}

export const favoritesActions = {
  setFavorites: (favorites: Favorite[]) => ({ type: 'SET_FAVORITES', favorites }) as const,
  addFavorite: (favorite: Favorite) => ({ type: 'ADD_FAVORITE', favorite }) as const,
  editFavorite: (index: number, favorite: Favorite) => ({ type: 'EDIT_FAVORITE', payload: { favorite, index } }) as const,
  deleteFavorite: (index: number) => ({ type: 'DELETE_FAVORITE', index }) as const,
}

export const addFavoriteThunk = (favorite: Favorite) => async (dispatch: AppDispatch) => {
  dispatch(favoritesActions.addFavorite(favorite))
  dispatch(appActions.setMessage({
    text: 'Запрос успешно добавлен в избранное',
    type: 'success',
  }))
}

export const deleteFavoriteThunk = (index: number) => async (dispatch: AppDispatch) => {
  dispatch(favoritesActions.deleteFavorite(index))
  dispatch(appActions.setMessage({
    text: 'Запрос успешно удален из избранного',
    type: 'success',
  }))
}

export const editFavoriteThunk = (
  index: number, favorite: Favorite,
) => async (dispatch: AppDispatch) => {
  dispatch(favoritesActions.editFavorite(index, favorite))
  dispatch(appActions.setMessage({
    text: 'Запрос успешно отредактирован',
    type: 'success',
  }))
}

type appActionsType = ReturnActionsType<typeof favoritesActions>

export default favoritesReducer
