import { createSelector } from 'reselect'
import { AppState } from './types'

export const getIsInitialized = (state: AppState) => state.app.isInitialized
export const getAuthToken = (state: AppState) => state.auth.authToken
export const getAuthUser = (state: AppState) => state.auth.authUser
export const getMessage = (state: AppState) => state.app.message
export const getVideos = (state: AppState) => state.video.videos
export const getVideosCount = (state: AppState) => state.video.count
export const getVideosQuery = (state: AppState) => state.video.query
export const getFavorites = (state: AppState) => state.favorites.favorites
export const getFavoritesQueries = createSelector(
  getFavorites, (favorites) => favorites.map((favorite) => favorite.query),
)

export default {}
