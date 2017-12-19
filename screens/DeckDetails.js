import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { light, white } from '../helpers/colors';

class DeckDetails extends Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        return {
            title: deckId
        }
    }
    goToCardForm = () => {
        const {deck, navigation} = this.props
        navigation.navigate('NewCard', {deckId: deck.title})
    }

    goToQuizView = () => {
        const {deck, navigation} = this.props
        navigation.navigate('Quiz', {deckId: deck.title})
    }

    render () {
        const {deck} = this.props
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 40}}>
                    <Text style={styles.description}>{deck.title}</Text>
                    <Text style={styles.cards}>{`${deck.questions.length} cards`}</Text>
                </View>
                <View>
                    <TouchableOpacity style={[styles.addCardBtn, styles.btn]}  onPress={this.goToCardForm}>
                        <Text style={styles.addBtnText}>Add card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.startQuizBtn, styles.btn]} onPress={this.goToQuizView}>
                        <Text style={styles.quizBtnText}>Start quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect((state, props) => {
    const {deckId} = props.navigation.state.params
    deck = state.decks.byId[deckId]
    return {
        deck
    }
})(DeckDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 40
    },
    description: {
        fontSize: 30,
        textAlign: 'center'
    },
    cards: {
        fontSize: 20,
        opacity: 0.4,
        textAlign: 'center'
    },
    btn: {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10      
    },
    addCardBtn: {
        borderWidth: 1,
        borderColor: light,
        marginBottom: 5
    },
    addBtnText: {
        fontSize: 20,
        textAlign: 'center'
    },
    quizBtnText: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    },
    startQuizBtn: {
        backgroundColor: light
    }
})