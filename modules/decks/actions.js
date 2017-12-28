import {saveDeck as saveDeckInDb, getDecks, addCardToDeck, removeCardFromDeck} from '../../helpers/api'

export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_DECKS = 'SAVE_DECKS'
export const SAVE_ROUTE_KEY = 'SAVE_ROUTE_KEY'

export const createDeck = (deck, callback) => dispatch => {
    saveDeckInDb(deck).then(newDeck => {
        dispatch(saveDeck(newDeck))
        if(callback) {
            callback(newDeck)
        }
    })
}

export const fetchDecks = () => dispatch => {
    getDecks().then(data => {
        dispatch(saveDecks(data))
    })
}

export const addQuestion = (deckId, question) => dispatch => {
    addCardToDeck(deckId, question).then(deck => {
        dispatch(saveDeck(deck))
    })
}

export const deleteQuestion = (deckId, cardTitle, callback) => dispatch => {
    removeCardFromDeck(deckId, cardTitle).then(deck => {
        dispatch(saveDeck(deck))
        callback()
    })
}

export const saveRouteKey = (key) => ({type:SAVE_ROUTE_KEY, key})
export const saveDeck = (deck) => ({type: SAVE_DECK, deck})
export const saveDecks = (decks) => ({type: SAVE_DECKS, decks})