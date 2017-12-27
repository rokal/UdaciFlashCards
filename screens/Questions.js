import React, {Component} from 'react'
import {connect} from 'react-redux'
import {values, map, get} from 'lodash'
import {View, Text, FlatList, ToastAndroid} from 'react-native'
import QuestionItem from './QuestionItem'
import { deleteQuestion } from '../modules/decks/actions'

class Questions extends Component {

    handleQuestionPressed = (question) => {
        const {navigation, deck} = this.props
        navigation.navigate('QuestionDetails', {deckId: deck.title, questionTitle: get(question, 'title', ''), onDeleteQuestion: this.handleDeleteQuestion})
    }

    handleDeleteQuestion = (questionTitle) => {
        const {dispatch, deck} = this.props
        dispatch(deleteQuestion(deck.title, questionTitle, () => {
            ToastAndroid.show(`"${questionTitle}" has been deleted`, ToastAndroid.SHORT);
        }))
    }
    render() {
        const {deck} = this.props
        return (
            <FlatList
                data={map(deck.questions, question => ({...question, key: question.title}))}
                renderItem={({item}) => {
                    return <QuestionItem question={item} onPress={() => this.handleQuestionPressed(item)} />
                }}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    const {deckId} = props.navigation.state.params
    deck = state.decks.byId[deckId]
    return {deck}
}

export default connect(mapStateToProps)(Questions)
