import { AppDispatch, Message, ReturnActionsType } from '../../types'
import { authActions } from './authReducer'
import { favoritesActions } from './favoritesReducer'

const initialState = {
  isInitialized: false,
  message: {} as Message,
}

type InitialState = typeof initialState

const appReducer = (state = initialState, action: appActionsType): InitialState => {
  switch (action.type) {
    case 'SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    case 'SET_MESSAGE':
      return { ...state, message: action.message }

    default: return state
  }
}

export const appActions = {
  setIsInitialized: (isInitialized: boolean) => ({ type: 'SET_IS_INITIALIZED', isInitialized }) as const,
  setMessage: (message: Message) => ({ type: 'SET_MESSAGE', message }) as const,
}

export const initialize = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token')
  const authUser = localStorage.getItem('authUser')

  if (token) {
    dispatch(authActions.setAuthToken(token))
    if (authUser) {
      dispatch(authActions.setAuthUser(authUser))
      const data = localStorage.getItem(authUser)
      if (data) {
        dispatch(favoritesActions.setFavorites(JSON.parse(data)))
      }
    } else {
      dispatch(appActions.setMessage({
        text: 'Не удалось определить пользователя, данные не будут сохраняться',
        type: 'error',
      }))
    }
  }

  dispatch(appActions.setIsInitialized(true))
}

type appActionsType = ReturnActionsType<typeof appActions>

export default appReducer
