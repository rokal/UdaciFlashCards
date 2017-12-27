import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {get, map, isNil} from 'lodash'
import {NavigationActions} from 'react-navigation'
import { connect } from 'react-redux'
import { white, light, primary } from '../helpers/colors'
import {computeQuizResult} from '../helpers/quizEngine'
import {clearLocalNotification, setLocalNotification} from '../helpers/notification'
import CustomButton from './CustomButton'
import Answers from './Answers'
import UserAnswers from './UserAnswers'
import FontAwesome from '@expo/vector-icons/FontAwesome';

class Quiz extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            currentQuestionIndex: 0,
            showResponse: false,
            responses: props.initialResponses,
            quizResult: null
        }
    }

    toggleQuestionView = () => {
        this.setState({showResponse: !this.state.showResponse})
    }

    saveAnswers = (response) => {
        const {currentQuestionIndex, showResponse, responses} = this.state
        const {deck} = this.props
        const question  = deck.questions[currentQuestionIndex]
        const newResponses = {...responses}
        newResponses[question.title] = response
        this.setState({responses: newResponses, currentQuestionIndex: currentQuestionIndex+1, showResponse: false})
    }

    saveUserAnswer = (response) => {
        const {currentQuestionIndex, showResponse, responses} = this.state
        const {deck} = this.props
        const question  = deck.questions[currentQuestionIndex]
        const newResponses = {...responses}
        newResponses[question.title] = response
        this.setState({responses: newResponses})
    }

    computeQuizResult = () => {
        const {responses} = this.state
        const score = computeQuizResult(responses)
        this.setState({quizResult: score})
        clearLocalNotification().then(setLocalNotification)
    }

    render () {
        const {showResponse, currentQuestionIndex, responses, quizResult} = this.state
        const {deck, navigation} = this.props
        const currentQuestion = deck['questions'][currentQuestionIndex] || {}
        const isQuizFinished = currentQuestionIndex === deck.questions.length
        if (deck.questions.length === 0) {
            return (
                <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 25, opacity: 0.5, textAlign: 'center'}}>You have no questions in your deck</Text>
                    <CustomButton 
                        backgroundColor={white} 
                        borderColor={light} 
                        label='Click here to add some'
                        textColor={primary}
                        onPress={() => {
                            navigation.goBack()
                            navigation.navigate('NewQuestion')
                        }} />
                </View>
            )
        }
        return !isQuizFinished ? (
                <View style={{padding: 10}}>
                    <Text>{`${currentQuestionIndex+1}/${deck.questions.length}`}</Text>
                    <View style={[styles.center, {height: '95%'}]}>
                        <View style={[{marginBottom: 30}, styles.center]}>
                            {!showResponse ? (
                                <Text style={[styles.text]}>{currentQuestion.title}</Text>
                            ) : (
                                <Answers answers={currentQuestion.answers} />
                            )}
                            <TouchableOpacity onPress={this.toggleQuestionView}>
                                {
                                    showResponse ? <FontAwesome name='eye-slash' size={30} /> : <FontAwesome name='eye' size={30}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <UserAnswers answers={responses[currentQuestion.title]} onResponseInput={this.saveUserAnswer} />
                        <View style={styles.center}>
                            <CustomButton borderColor={primary} backgroundColor={white} textColor={primary} label='Next' onPress={() => this.setState({currentQuestionIndex: currentQuestionIndex+1, showResponse: false})} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={[{padding: 10, height: '95%'}, styles.center]}>
                    <Text style={{fontSize: 20, marginBottom: 20, opacity: 0.7}}>The quiz is done</Text>
                    {
                        !isNil(quizResult) ? (
                            <View style={ styles.center }>
                                <Text style={{fontSize:25, opacity: 0.5}}>{`Your score is `}</Text>
                                <Text style={{fontSize:25, color: light}}>{`${quizResult}%`}</Text>
                                <CustomButton background={light} label='Restart' onPress={() => navigation.navigate('Quiz', {deckId: deck.title})} />
                                <CustomButton borderColor={primary} backgroundColor={white} textColor={primary} label='Go to home screen' onPress={() => {
                                    navigation.dispatch(
                                        NavigationActions.reset({
                                         index: 0,
                                         actions: [
                                           NavigationActions.navigate({ routeName: 'Home'})
                                         ]
                                       }))
                                }} />
                            </View>
                        ) : (
                            <CustomButton background={light} label='Show my score' onPress={this.computeQuizResult} />
                        )
                    }
                    
                </View>
            )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    const deck = get(state, `decks.byId.${deckId}`, {})
    const initialResponses = {}
    for(let question of deck.questions) {
        initialResponses[question.title] = map(question.answers, ans => ({...ans, userResponse: false}))
    }
    return {deck, initialResponses}}
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