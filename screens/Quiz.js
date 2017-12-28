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
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FlipCard from 'react-native-flip-card'
import commonStyles from '../helpers/styles'

const initialState = {
    currentQuestionIndex: 0,
    showResponse: false,
    quizResult: null
}

const createInitialResponse = (questions) => {
    const initialResponses = {}
    for(let question of deck.questions) {
        initialResponses[question.title] = map(question.answers, ans => ({...ans, userResponse: false}))
    }
    return initialResponses
}

class Quiz extends React.Component{
    constructor (props) {
        super(props)
        this.state = {...initialState, responses: props.initialResponses}
    }

    toggleQuestionView = () => {
        this.setState({showResponse: !this.state.showResponse})
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
        const {deck, navigation, initialResponses} = this.props
        const currentQuestion = deck['questions'][currentQuestionIndex] || {}
        const isQuizFinished = currentQuestionIndex === deck.questions.length
        if (deck.questions.length === 0) {
            return (
                <View style={commonStyles.center}>
                    <Text style={[commonStyles.text, {opacity: 0.5}]}>You have no questions in your deck</Text>
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
                    <View style={[commonStyles.center, {height: '95%'}]}>
                        <FlipCard
                            style={[commonStyles.center, {maxHeight: '65%', alignItems: 'center', borderWidth: 1, borderColor: light}]}
                            flip={showResponse}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                        >
                            <View style={{padding: 10, alignItems: 'center'}}>
                               <View style={[commonStyles.center, {height: '100%'}]}>
                                    <Text style={[commonStyles.text, {opacity: 0.5}]}>{currentQuestion.title}</Text>
                                    <FontAwesome color={primary} name='eye' size={30} />
                               </View>
                            </View>
                            <View  style={[commonStyles.center, {padding: 10, justifyContent: 'space-between'}]}>
                                <View style={[commonStyles.center, {height: '100%'}]}>
                                    <Answers answers={currentQuestion.answers} />
                                    <FontAwesome name='eye-slash' color={primary} size={30} />
                                </View>
                            </View>
                        </FlipCard>
                        <View style={{width: '100%', marginTop: -100}}>
                            <UserAnswers answers={responses[currentQuestion.title]} onResponseInput={this.saveUserAnswer} />
                        </View>
                        <View style={commonStyles.center}>
                            <CustomButton borderColor={primary} backgroundColor={white} textColor={primary} label='Next' onPress={() => this.setState({currentQuestionIndex: currentQuestionIndex+1, showResponse: false})} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={[{padding: 10, height: '95%'}, commonStyles.center]}>
                    <Text style={{fontSize: 20, marginBottom: 20, opacity: 0.7}}>The quiz is done</Text>
                    {
                        !isNil(quizResult) ? (
                            <View style={ commonStyles.center }>
                                <Text style={{fontSize:25, opacity: 0.5}}>{`Your score is `}</Text>
                                <Text style={{fontSize:25, color: light}}>{`${quizResult}%`}</Text>
                                <CustomButton background={light} label='Restart' onPress={() => this.setState({...initialState, responses: createInitialResponse(deck.questions)})} />
                                <CustomButton borderColor={primary} backgroundColor={white} textColor={primary} label='Go back' onPress={() => {
                                    navigation.goBack()
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
    return {deck, initialResponses: createInitialResponse(deck.questions)}}
)(Quiz)
