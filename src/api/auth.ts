import axios from 'axios'
import { GetUserResponse } from 'types'

export default {
  getUsers: () => axios.get<GetUserResponse>('users.json'),
}
