import { ResponseVideo, RouteConstType, Video } from 'types'
import API from 'constants/youtube'

export const generateToken = () => Math.random().toString(36)
export const getMapLinksByCurrentRoute = (subRoutes: RouteConstType) => {
  const mapLinks = [] as {
    name: string
    route: string
    title: string
  }[]
  if (subRoutes) {
    const routesEntries = Object.entries(subRoutes)
    routesEntries.forEach((route) => {
      if (route[1].routeOptions.path && route[1].title) {
        mapLinks.push({
          name: route[0],
          route: route[1].routeOptions.path as string,
          title: route[1].title,
        })
      }
    })
  }
  return mapLinks
}

export const extractFields = (videos: ResponseVideo[]): Video[] => videos.map((i) => ({
  image: { ...i.snippet.thumbnails.medium },
  title: i.snippet.title,
  type: i.snippet.description,
  url: API.WATCH_URL + i.id.videoId,
  publishedAt: i.snippet.publishedAt,
}))

export default {}
