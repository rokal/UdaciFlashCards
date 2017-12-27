import React, {Component, PureComponent} from 'react'
import {connect} from 'react-redux'
import {find} from 'lodash'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import {TabNavigator} from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons'
import { light, white, primary } from '../helpers/colors'
import CustomButton from './CustomButton'
import Tabs from '../navigation/HomeNav'
import Questions from './Questions'
import NewQuestion from './NewQuestion'
import Answers from './Answers'
import {getTabNavOptions} from '../helpers/navConfig'


const DeleteBtn = ({onPress}) => {
    return (
        <View>
            <TouchableOpacity style={{backgroundColor: white,  marginRight: 5}} onPress={onPress}>
                <FontAwesome name='window-close-o' color={primary} size={20}/>
            </TouchableOpacity>
        </View>
    )
}

class QuestionDetails extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId, questionTitle, onDeleteQuestion} = navigation.state.params
        return {
            title: questionTitle,
            headerRight: <DeleteBtn onPress={() => {
                navigation.goBack()
                onDeleteQuestion(questionTitle)
            }} />
        }
    }

    render () {
        const {question, navigation} = this.props
        return (
            <View style={{flex: 1, padding: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 25}}>{question.title}</Text>
                <Text style={{fontSize: 20, opacity: 0.5}}>Answers</Text>
                <Answers answers={question.answers} />
            </View>
        )
    }
}

const QuestionDetailsConnected = connect((state, props) => {
    const {deckId, questionTitle} = props.navigation.state.params
    const deck = state.decks.byId[deckId]
    const question = find(deck.questions, {title: questionTitle}) || {}
    return{ question } 
})(QuestionDetails)

export default QuestionDetailsConnected
