import React, {Component} from 'react'
import {Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

import { white, light } from '../helpers/colors'
import {createDeck} from '../modules/decks/actions'

class NewDeck extends Component {
    state = {value: ''}

    handleChangeText = (value) => {
        this.setState({value})
    }

    handleDeckCreation = () => {
        const {value} = this.state
        const {dispatch, navigation} = this.props
        dispatch(createDeck({title: value, questions: []}))
        this.setState({value: ''})
        navigation.navigate('Decks')
    }

    render() {
        const {value} = this.state
        const disabled = value.length === 0
        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={2} behavior='padding'>
                <Text style={styles.title}>What is the title of your new deck ?</Text>
                <TextInput style={styles.inputText}
                    onChangeText={this.handleChangeText}
                    value={value}
                    placeholder='Deck title'
                />
                <TouchableOpacity style={{backgroundColor: light,  marginTop: 15 }} disabled={disabled} onPress={this.handleDeckCreation}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect()(NewDeck)

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

