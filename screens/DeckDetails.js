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

const StartQuizBtn = ({onPress}) => {
    return (
        <View>
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
        const {deckId} = navigation.state.params
        return {
            title: deckId,
            headerRight: <StartQuizBtn onPress={() => navigation.navigate('Quiz', {deckId})} />
        }
    }

    goToCardForm = () => {
        const {deck, navigation} = this.props
        navigation.navigate('NewCard', {deckId: deck.title})
    }

    goToQuizView = () => {
        const {deck, navigation} = this.props
        navigation.navigate('Quiz', {deckId: deck.title})
    }

    render () {
        const {deck, navigation} = this.props
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
})(DeckDetails)

DeckDetailsConnected.router = QuestionTabs.router

export default DeckDetailsConnected

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 40
    },
    description: {
        fontSize: 30,
        textAlign: 'center'
    },
    cards: {
        fontSize: 20,
        opacity: 0.4,
        textAlign: 'center'
    }
})