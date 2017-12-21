import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { white } from '../helpers/colors'

export default function CustomButton ({backgroundColor, textColor, borderColor, label, onPress}) {
    const borderStyle = borderColor ? {borderWidth: 1, borderColor} : {}
    return (
        <View>
            <TouchableOpacity style={[styles.btn, {backgroundColor, ...borderStyle}]} onPress={onPress}>
                <Text style={[styles.btnText, {color: textColor}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 150, 
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