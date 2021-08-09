import { youtube } from 'api'
import {
  AppDispatch, Favorite, ReturnActionsType, Video,
} from 'types'
import { extractFields } from 'utils'
import { appActions } from './appReducer'

const initialState = {
  videos: [] as Video[],
  query: '',
  count: 0,
}

type InitialState = typeof initialState

const appReducer = (state = initialState, action: appActionsType): InitialState => {
  switch (action.type) {
    case 'SET_VIDEO': return {
      ...state,
      videos: action.videos,
    }
    case 'SET_QUERY': return {
      ...state,
      query: action.query,
    }
    case 'SET_COUNT': return {
      ...state,
      count: action.count,
    }
    case 'CLEAR_VIDEOS':
      return {
        ...state,
        count: 0,
        videos: [],
        query: '',
      }
    default: return state
  }
}

export const videoActions = {
  setVideos: (videos: Video[]) => ({ type: 'SET_VIDEO', videos }) as const,
  setQuery: (query: string) => ({ type: 'SET_QUERY', query }) as const,
  setCount: (count: number) => ({ type: 'SET_COUNT', count }) as const,
  clearVideos: () => ({ type: 'CLEAR_VIDEOS' }) as const,
}

export const setVideosThunk = (query: string | Favorite) => async (dispatch: AppDispatch) => {
  try {
    const result = await youtube.getVideos(query)
    const videos = extractFields(result.data.items)

    dispatch(videoActions.setCount(result.data.pageInfo.totalResults))

    if (typeof query === 'string') {
      dispatch(videoActions.setQuery(query))
    } else {
      dispatch(videoActions.setQuery(query.query))
    }

    dispatch(videoActions.setVideos(videos))
  } catch (e) {
    dispatch(appActions.setMessage({
      type: 'error',
      text: e.message,
    }))
  }
}

type appActionsType = ReturnActionsType<typeof videoActions>

export default appReducer
