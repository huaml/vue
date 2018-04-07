import axios from 'axios'

export function query (type, postid) {
  const url = '/api/query'
  const data = Object.assign({}, {
    type: type,
    postid: postid,
    temp: Math.random()
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
