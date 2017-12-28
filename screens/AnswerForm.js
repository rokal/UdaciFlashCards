import React from 'react'
import {Text, View, TextInput, StyleSheet, Switch, ToastAndroid} from 'react-native'

import CustomSwitch from './CustomSwitch'
import {newAnswerValidation, validateEntity} from '../modules/commons/validate'
import CustomButton from './CustomButton'
import { light } from '../helpers/colors'

class AnswerForm extends React.Component{
    state = {
        formMode: false,
        answer: '',
        isTruthy: true
    }

    handleSave = () => {
        const {onSave} = this.props
        const {answer, isTruthy} = this.state
        const answerToSave = {body: answer, isTruthy}
        const validationMessage = validateEntity(answerToSave, newAnswerValidation)
        if(validationMessage) {
            ToastAndroid.show(validationMessage, ToastAndroid.SHORT)
        }else{
            onSave(answerToSave)
            this.setState({formMode: false, answer: '', isTruthy: true})
        }
    }
    render() {
        const {formMode, answer, isTruthy} = this.state
        const {disableNewEntry} =this.props
        return (
            <View>
                {!formMode && <CustomButton disabled={disableNewEntry} backgroundColor={disableNewEntry ? '#000' : light} onPress={() => this.setState({formMode: true})} label='add answer' />}
                {formMode && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput style={[styles.inputText, {width: '50%'}]}
                            onChangeText={(value) => this.setState({answer: value})}
                            value={answer}
                            placeholder='Input the answer'
                        />
                        <CustomSwitch label= 'Is truthy?'
                            onValueChange={ (value) => this.setState({ isTruthy: value })} 
                            value={ isTruthy } 
                        />
                        <CustomButton onPress={this.handleSave} label='add' minWidth={50} />
                    </View>
                )}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputText: {
        height: 40,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    }
})
export default AnswerForm
