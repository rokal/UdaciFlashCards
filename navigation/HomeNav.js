import {TabNavigator} from 'react-navigation'
import Decks from '../screens/Decks'
import NewDeck from '../screens/NewDeck'
import { primary, white } from '../helpers/colors';

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
},
{
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: primary,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

export default Home