import { RouteProps } from 'react-router-dom'
import { FC } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { FieldMetaProps } from 'formik/dist/types'
import { FieldAttributes } from 'formik/dist/Field'
import { rootReducer } from './redux/store'

export type RouteType = {
  Component: FC<any>
  routes?: RouteType[]
} & RouteProps

export type RouteConstType = {
  [key in string]: {
    routeOptions: RouteProps
    title?: string
    subRoutes?: RouteConstType
  }
}

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppState, void, AnyAction>

type ReturnACType<T> = T extends { [key: string]: infer U } ? U : never
export type ReturnActionsType<
  T extends {[key: string]: (...args: any[]) => any}
  > = ReturnType<ReturnACType<T>>

export type FormFieldProps = {
  title: string
  meta: FieldMetaProps<AuthFormFields>
} & FieldAttributes<any>

export type AuthFormFields = {
  password: string
  login: string
}

export type SearchFormFields = {
  searchText: string
}

export type AddFavoriteFormFields = {
  query: string,
  queryName: string,
  sort?: string,
  count: number,
}

export type Message = {
  text: string
  type: 'success' | 'error'
}

export type GetUserResponse = {
  [key in string]: string
}

export type Video = {
  title: string
  type: string
  image: {
    url: string
    width: number
    height: number
  }
  url: string
  publishedAt: Date
}

export type ResponseVideo = {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
    channelId: string
    playlistId: string
  }
  snippet: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
        width: number
        height: number
      }
    }
    channelTitle: string
    liveBroadcastContent: string
  }
}

export type ResponseGetVideosYoutube = {

  kind: string
  etag: string
  nextPageToken: string
  prevPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: ResponseVideo[]
}

export type DisplayTypeVideos = 'grid' | 'list'

export type Favorite = AddFavoriteFormFields
