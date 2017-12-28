import {StackNavigator} from 'react-navigation'
import DeckTabs from './HomeNav'
import DeckDetails from '../screens/DeckDetails'
import Quiz from '../screens/Quiz'
import { light, white, primary } from '../helpers/colors'
import QuestionDetails from '../screens/QuestionDetails'

const Nav = StackNavigator({
    Home: {
        screen: DeckTabs
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0
          }
        }
    },
    QuestionDetails: {
      screen: QuestionDetails,
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: primary
          }
        }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        title: 'Quiz',
        headerStyle: {
          backgroundColor: primary
        }
      }
  }
})

export default Nav
