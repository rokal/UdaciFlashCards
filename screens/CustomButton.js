import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { white, light } from '../helpers/colors'

export default function CustomButton ({backgroundColor= light, disabled, textColor= white, borderColor, label, onPress, minWidth = 150}) {
    const borderStyle = borderColor ? {borderWidth: 1, borderColor} : {}
    return (
        <View>
            <TouchableOpacity disabled={disabled} style={[styles.btn, {backgroundColor, minWidth, ...borderStyle}]} onPress={onPress}>
                <Text style={[styles.btnText, {color: textColor}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    btnText: {
        fontSize: 20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 15,
        paddingRight: 15
    }
})