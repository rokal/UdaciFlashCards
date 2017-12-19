import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { white } from '../helpers/colors';

class Quiz extends React.Component{
    state = {
        currentQuestion: 1
    }
    render () {
        const {deck} = this.props
        return (
            <View>
                <View style={{flexGrow: 1}}>
                    <Text>1/2</Text>
                </View>
                <View style={[styles.center]}>
                    <View style={[{marginBottom: 30}, styles.center]}>
                        <Text style={[styles.text]}>React native is a very nice framework.</Text>
                        <TouchableOpacity>
                            <Text style={styles.toggleBtn}>Question / Response</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        <TouchableOpacity style={[styles.center, {backgroundColor: 'red', width: 150, marginBottom: 10, borderRadius: 10}]}>
                            <Text style={styles.btnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center, {backgroundColor: 'green', width: 150, marginBottom: 10, borderRadius: 10}]}>
                            <Text style={styles.btnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                 </View>
            </View>
        )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    deck = state.decks.byId[deckId]
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
    btnText: {
        color: white,
        fontSize: 30,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10
    },
    title: {
        marginBottom: 20
    }
})