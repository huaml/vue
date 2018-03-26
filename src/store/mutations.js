import * as types from './mutation-types'

var mutations = {
  [types.SET_SELECT_BOOK] (state, book) {
    state.selectBook = book
  }
}

export default mutations
