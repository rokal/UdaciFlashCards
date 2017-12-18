import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

import { white, light } from '../helpers/colors'
import {addCard} from '../modules/decks/actions'

class NewCard extends Component {
    state = {question: '', answer: ''}

    handleCardCreation = () => {
        const {question, answer} = this.state
        const {dispatch, navigation, deck} = this.props
        dispatch(addCard(deck.title, question, answer))
        console.log('after dispatch')
        this.setState({question: '', answer: ''})
        navigation.goBack()
    }

    render() {
        const {question, answer} = this.state
        const disabled = question.length === 0 || answer.length === 0
        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={2} behavior='padding'>
                <TextInput style={styles.inputText}
                    onChangeText={(value) => this.setState({question: value})}
                    value={question}
                    placeholder='Question'
                />
                <TextInput style={styles.inputText}
                    onChangeText={(value) => this.setState({answer: value})}
                    value={answer}
                    placeholder='Answer'
                />
                <TouchableOpacity style={{backgroundColor: light,  marginTop: 15}} disabled={disabled} onPress={this.handleCardCreation}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    deck = state.decks.byId[deckId]
    return {
        deck
    }
})(NewCard)

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

