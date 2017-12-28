import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {newQuestionValidation, validateEntity} from '../modules/commons/validate'

import AnswerForm from './AnswerForm'
import Answers from './Answers'

import { white, light } from '../helpers/colors'
import {addQuestion} from '../modules/decks/actions'

class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {question: {title: '', answers: []}}
    }

    handleQuestionCreation = () => {
        const {question} = this.state
        const {dispatch, navigation, deck, routeKey} = this.props
        const validationMessage = validateEntity(question, newQuestionValidation)
        if(validationMessage) {
            ToastAndroid.show(validationMessage, ToastAndroid.SHORT)
        }else{
            dispatch(addQuestion(deck.title, question))
            const setParamsAction = NavigationActions.setParams({
                params: {cardsCount: deck.questions.length + 1},
                key: routeKey
            })
            navigation.dispatch(setParamsAction)
            this.setState({question: {title: '', answers: []}})
            navigation.goBack()
        }
    }

    handleAddAnswer = (answer) => {
        const question = {...this.state.question}
        question.answers.push(answer)
        this.setState({question})
    } 

    handleSetTitle = (value) => {
        const {question} = this.state
        const updatedQuestion = {...question, title: value}
        this.setState({question: updatedQuestion})
    }

    render() {
        const {question} = this.state
        const isAnswersSizeReached = question.answers.length === 4
        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={2} behavior='padding'>
                <TextInput style={styles.inputText}
                    onChangeText={this.handleSetTitle}
                    value={question.title}
                    placeholder='Title'
                />
                <Answers answers={question.answers} />
                <AnswerForm onSave={this.handleAddAnswer} disableNewEntry={isAnswersSizeReached}/>
                <TouchableOpacity style={{backgroundColor: light,  marginTop: 15}} onPress={this.handleQuestionCreation}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    const deck = state.decks.byId[deckId]
    const routeKey = state.decks.routeKey
    return {deck, routeKey}
})(NewQuestion)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: white,
        fontSize: 30,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 15,
        paddingRight: 15
    },
    inputText: {
        width: '100%',
        height: 40,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    }
})

