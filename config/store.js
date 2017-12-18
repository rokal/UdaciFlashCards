import rootReducers from '../modules/reducers'
import ReduxThunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'

let composeEnhancers = composeWithDevTools({
    realtime: true,
    name: 'UdiciFlashCards',
    host: '192.168.0.161',
    port: 19000
});

export function configureStore () {
 const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(ReduxThunk)
 ))
 return store
}