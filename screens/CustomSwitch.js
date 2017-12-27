import React from 'react'
import {View, Text, Switch} from 'react-native'
import { white, light } from '../helpers/colors'

export default function CustomSwitch ({label, value, onValueChange}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{label}</Text>
            <Switch onValueChange={onValueChange} onValueChange={onValueChange} value={ value } />
        </View>
    )
}
