import axios from 'axios'

export function autonumber (text) {
  const url = '/api/autonumber'
  const data = Object.assign({}, {
    resultv2: 1,
    text: text
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
