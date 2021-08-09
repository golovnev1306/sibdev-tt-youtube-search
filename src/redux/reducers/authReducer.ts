import { auth } from 'api'
import { generateToken } from 'utils'
import { AppDispatch, AuthFormFields, ReturnActionsType } from '../../types'
import { favoritesActions } from './favoritesReducer'
import { videoActions } from './videoReducer'

const initialState = {
  authToken: '',
  authUser: '',
}

type InitialState = typeof initialState

const authReducer = (state = initialState, action: appActionsType): InitialState => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return { ...state, authToken: action.authToken }
    case 'SET_AUTH_USER':
      return { ...state, authUser: action.authUser }
    default: return state
  }
}

export const authActions = {
  setAuthToken: (authToken: string) => ({ type: 'SET_AUTH_TOKEN', authToken }) as const,
  setAuthUser: (authUser: string) => ({ type: 'SET_AUTH_USER', authUser }) as const,
}

export const authorize = ({ login, password }: AuthFormFields) => async (dispatch: AppDispatch) => {
  let result
  try {
    result = await auth.getUsers()
  } catch (e) {
    throw Error('Ошибка HTTP запроса')
  }
  const users = result.data
  if (users[login] && users[login] === password) {
    const token = generateToken()
    dispatch(authActions.setAuthToken(token))
    dispatch(authActions.setAuthUser(login))

    localStorage.setItem('token', token)
    localStorage.setItem('authUser', login)

    const userData = localStorage.getItem(login)
    if (!userData) {
      localStorage.setItem(login, JSON.stringify({
        favorites: [],
      }))
      return
    }

    dispatch(favoritesActions.setFavorites(JSON.parse(userData)))
    return
  }
  throw Error('Неверный логин/пароль, повторите попытку')
}

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(authActions.setAuthToken(''))
  dispatch(authActions.setAuthUser(''))
  dispatch(videoActions.clearVideos())
  localStorage.removeItem('token')
  localStorage.removeItem('authUser')
}

type appActionsType = ReturnActionsType<typeof authActions>

export default authReducer
