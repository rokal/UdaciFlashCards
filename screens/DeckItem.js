import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { light } from '../helpers/colors';

export default function ({deck, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.cards}>{`${deck.questions.length} cards`}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: light
    },
    title: {
        fontSize:20,
        textAlign: 'center'
    },
    cards: {
        fontSize:16,
        textAlign: 'center',
        color: '#000',
        opacity: 0.7
    }
})