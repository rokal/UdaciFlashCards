import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {get} from 'lodash'
import { connect } from 'react-redux'
import { white, light } from '../helpers/colors'
import CustomButton from './CustomButton'

class Quiz extends React.Component{
    state = {
        currentQuestionIndex: 0,
        showResponse: false,
        responses: {}
    }

    toggleQuestionView = () => {
        this.setState({showResponse: !this.state.showResponse})
    }

    saveAnswer = (response) => {
        const {currentQuestionIndex, showResponse, responses} = this.state
        const {deck} = this.props
        const question  = deck.questions[currentQuestionIndex]
        const newResponses = {...responses}
        newResponses[question.title] = response
        this.setState({responses: newResponses, currentQuestionIndex: currentQuestionIndex+1, showResponse: false})
    }

    render () {
        const {showResponse, currentQuestionIndex} = this.state
        const {deck} = this.props
        const responseText = showResponse ? 'Question' : 'Response'
        const currentQuestion = deck['questions'][currentQuestionIndex] || {}
        const description = showResponse ? currentQuestion.answer : currentQuestion.question
        const isQuizFinished = currentQuestionIndex === deck.questions.length
        return !isQuizFinished ? (
                <View style={{padding: 10}}>
                    <Text>{`${currentQuestionIndex+1}/${deck.questions.length}`}</Text>
                    <View style={[styles.center, {height: '95%'}]}>
                        <View style={[{marginBottom: 30}, styles.center]}>
                            <Text style={[styles.text]}>{description}</Text>
                            <TouchableOpacity onPress={this.toggleQuestionView}>
                                <Text style={styles.toggleBtn}>{responseText}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.center}>
                            <CustomButton backgroundColor='green' textColor={white} label='Correct' onPress={() => this.saveAnswer(true)} />
                            <CustomButton backgroundColor='red' textColor={white} label='Incorrect' onPress={() => this.saveAnswer(false)} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={[{padding: 10, height: '95%'}, styles.center]}>
                    <Text style={{fontSize: 20}}>The quiz is done</Text>
                    <CustomButton background={light} label='Show my score' onPress={() => alert('Quiz done')} />
                </View>
            )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    const deck = get(state, `decks.byId.${deckId}`, {})
    return {deck}}
)(Quiz)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    },
    toggleBtn: {
        fontSize: 30,
        color: 'red',
        padding: 10
    },
    title: {
        marginBottom: 20
    }
})