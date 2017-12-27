import {TabNavigator, StackNavigator} from 'react-navigation'
import Decks from '../screens/Decks'
import NewDeck from '../screens/NewDeck'
import { primary, white } from '../helpers/colors'
import {getTabNavOptions} from '../helpers/navConfig'

const navigationOptions = getTabNavOptions('FlashCards')
const Home = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        }
    }
},navigationOptions)

export default Home