import React, {Component} from 'react'
import {connect} from 'react-redux'
import {values} from 'lodash'
import {View, Text, FlatList} from 'react-native'
import {fetchDecks} from '../modules/decks/actions'
import DeckItem from './DeckItem'

class Decks extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchDecks())
    }

    handleDeckPressed = (deck) => {
        const {navigation} = this.props
        navigation.navigate('DeckDetails', {deckId: deck.title})
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
    const decks = values(state.decks.byId).map((deck, index) => ({...deck, key: deck.title}))
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)
