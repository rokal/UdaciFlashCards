import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native'
import {connect} from 'react-redux'

import { white, light } from '../helpers/colors'
import {createDeck} from '../modules/decks/actions'
import {newDeckValidation, validateEntity} from '../modules/commons/validate'

class NewDeck extends Component {
    state = {value: ''}

    handleChangeText = (value) => {
        this.setState({value})
    }

    handleDeckCreation = () => {
        const {value} = this.state
        const {navigation, createDeck} = this.props
        const newDeck = {title: value, questions: []}
        const validationMessage = validateEntity(newDeck, newDeckValidation)
        if(validationMessage) {
            ToastAndroid.show(validationMessage, ToastAndroid.SHORT)
        }else{
            createDeck(newDeck, () => {
                navigation.navigate('DeckDetails', {deckId: value})
                this.setState({value: ''})
            })
        }
    }

    render() {
        const {value} = this.state
        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={2} behavior='padding'>
                <Text style={styles.title}>What is the title of your new deck ?</Text>
                <TextInput style={styles.inputText}
                    onChangeText={this.handleChangeText}
                    value={value}
                    placeholder='Deck title'
                />
                <TouchableOpacity style={{backgroundColor: light,  marginTop: 15 }} onPress={this.handleDeckCreation}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect(null, {createDeck})(NewDeck)

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
        fontSize: 20
    }
})

