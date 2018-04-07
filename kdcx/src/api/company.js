import axios from 'axios'

export function company () {
  const url = '/api/company'
  const data = Object.assign({}, {
    method: 'js',
    t: 201701051440
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
