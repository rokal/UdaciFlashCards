import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StatusBar, View } from 'react-native'
import {Constants} from 'expo'

import {configureStore} from './config/store'
import { dark } from './helpers/colors'
import {initialData, resetDb} from './helpers/api'
import Nav from './navigation'
import {createDeck} from './modules/decks/actions'
import {setLocalNotification} from './helpers/notification'

const store = configureStore()
store.dispatch(createDeck(initialData))
// resetDb()

function UdaciDecksStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciDecksStatusBar backgroundColor={dark} barStyle='light-content' />
          <Nav />
        </View>
      </Provider>
    );
  }
}
