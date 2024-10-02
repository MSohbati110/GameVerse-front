import axios from "axios"

const ISDEVELOPMODE = process.env.NODE_ENV !== 'production'
const django_api_url = 'http://192.168.103.5:8001'
const base_url = ISDEVELOPMODE ? django_api_url : ''

export default{
  auth: {
    login(user) {
      return axios({
        method: 'post',
        url: `${base_url}/api/token/`,
        data: user
      })
    },
    register(user) {
      return axios({
        method: 'post',
        url: `${base_url}/api/register/`,
        data: user
      })
    },
    tokenVerify(token) {
      return axios({
        method: 'post',
        url: `${base_url}/api/token/verify/`,
        data: token
      })
    }
  },
  getSudoku(data) {
    return axios({
      method: 'post',
      url: `${base_url}/sudoku/new/`,
      data: data
    })
  },
  getTanktrouble(data) {
    return axios({
      method: 'post',
      url: `${base_url}/tanktrouble/join/`,
      data: data
    })
  }
}