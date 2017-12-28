import React, {Component, PureComponent} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import {TabNavigator} from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons'
import { light, white, primary } from '../helpers/colors'
import CustomButton from './CustomButton'
import Tabs from '../navigation/HomeNav'
import Questions from './Questions'
import NewQuestion from './NewQuestion'
import {getTabNavOptions} from '../helpers/navConfig'
import styles from '../helpers/styles'
import {saveRouteKey} from '../modules/decks/actions'

const navigationOptions = getTabNavOptions()

const QuestionTabs = TabNavigator({
    Questions: {
        screen: Questions
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            tabBarLabel: 'New question'
        }
    }
},navigationOptions)

const RightActions = ({onPress, cardsCount}) => {
    return (
        <View style={[{flexDirection: 'row'}, styles.center]}>
            <Text style={{color: white, marginRight: 3}}>{cardsCount && `${cardsCount} cards`}</Text>
            <TouchableOpacity style={{backgroundColor: light,  marginRight: 5}} onPress={onPress}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding:5}}>
                    <FontAwesome name='caret-square-o-right' color={white} />
                    <Text style={ {color: white, padding: 2} }>start quiz</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

class DeckDetails extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId, cardsCount} = navigation.state.params
        return {
            title: deckId,
            headerRight: <RightActions cardsCount={cardsCount} onPress={() => navigation.navigate('Quiz', {deckId})} />
        }
    }

    componentDidMount() {
        const {navigation, saveRouteKey} = this.props
        const deckDetailsRouteKey = navigation.state.key
        saveRouteKey(deckDetailsRouteKey)
    }

    render () {
        const {navigation} = this.props
        return (
            <View style={{flex: 1}}>
                <QuestionTabs navigation={navigation}/>
            </View>
        )
    }
}

const DeckDetailsConnected = connect((state, props) => {
    const {deckId} = props.navigation.state.params
    return{ deck: state.decks.byId[deckId] } 
}, ({saveRouteKey}))(DeckDetails)

DeckDetailsConnected.router = QuestionTabs.router

export default DeckDetailsConnected