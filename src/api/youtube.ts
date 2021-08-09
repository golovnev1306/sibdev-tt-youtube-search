import axios from 'axios'
import API from 'constants/youtube'
import { Favorite, ResponseGetVideosYoutube } from '../types'

const instance = axios.create({
  baseURL: API.API_URL,
})

export default {
  getVideos: (query: string | Favorite) => {
    let params = {
      part: 'snippet',
      type: 'video',
      key: API.API_KEY,
      maxResults: 12,
    } as {
      [key in string]: any
    }

    if (typeof query !== 'string') {
      params = {
        ...params,
        q: query.query,
        maxResults: query.count,
        order: query.sort,
      }
    } else {
      params = {
        ...params,
        q: query,
      }
    }
    return instance.get<ResponseGetVideosYoutube>('search', {
      params,
    })
  },
}
