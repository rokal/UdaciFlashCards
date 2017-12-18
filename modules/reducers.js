import { combineReducers } from 'redux'
import commonReducers from './commons/reducer'
import decks from './decks/reducer'

const rootReducer = combineReducers({
  ...commonReducers,
  decks
})

export default rootReducer
