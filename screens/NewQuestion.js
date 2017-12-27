import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

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
        const {dispatch, navigation, deck} = this.props
        dispatch(addQuestion(deck.title, question))
        this.setState({question: {title: '', answers: []}})
        navigation.navigate('Questions')
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
        const disabled = question.title.length === 0 || question.answers.length === 0
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
                <TouchableOpacity style={{backgroundColor: light,  marginTop: 15}} disabled={disabled} onPress={this.handleQuestionCreation}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    deck = state.decks.byId[deckId]
    return {deck}
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

