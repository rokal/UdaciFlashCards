import React from 'react'
import {View, Text} from 'react-native'
import { CheckBox } from 'react-native-elements'
import {map} from 'lodash'

export default class UserAnswers extends React.Component{
    handleResponseInput (index, value) {
        const {onResponseInput} = this.props
        const newResponses = [...this.props.answers]
        newResponses[index].userResponse = value
        onResponseInput(newResponses)
    }
    render() {
        const {answers} = this.props
        return (
            <View>
                {map(answers, (ans, index) => <CheckBox key={index} title={ans.body} checked={ans.userResponse} onPress={() => this.handleResponseInput(index, !ans.userResponse)} />)}
            </View>
        )
    }
}