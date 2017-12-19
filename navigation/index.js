import {StackNavigator} from 'react-navigation'
import DeckTabs from './HomeNav'
import DeckDetails from '../screens/DeckDetails'
import NewCard from '../screens/NewCard'
import Quiz from '../screens/Quiz'
import { light, white } from '../helpers/colors';

const Nav = StackNavigator({
    Home: {
        screen: DeckTabs
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: light
          }
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
          headerTintColor: white,
          title: 'Add card',
          headerStyle: {
            backgroundColor: light
          }
        }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        title: 'Quiz',
        headerStyle: {
          backgroundColor: light
        }
      }
  }
})

export default Nav
