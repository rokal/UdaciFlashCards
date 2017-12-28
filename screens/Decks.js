import React, {Component} from 'react'
import {connect} from 'react-redux'
import {values} from 'lodash'
import {View, Text, FlatList} from 'react-native'
import {fetchDecks} from '../modules/decks/actions'
import DeckItem from './DeckItem'
import {getDecks} from '../modules/decks/selector'

class Decks extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchDecks())
    }

    handleDeckPressed = (deck) => {
        const {navigation} = this.props
        navigation.navigate('DeckDetails', {deckId: deck.title, cardsCount: deck.questions.length})
    }
    render() {
        const {decks} = this.props
        return (
            <FlatList
                data={decks}
                renderItem={({item, index}) => <DeckItem key={index} deck={item} onPress={() => this.handleDeckPressed(item)} />}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {decks : getDecks(state)}
}

export default connect(mapStateToProps)(Decks)
