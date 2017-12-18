import {saveDeckTitle, getDecks, addCardToDeck} from '../../helpers/api'

export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_DECKS = 'SAVE_DECKS'

export const createDeck = (title) => dispatch => {
    saveDeckTitle(title).then(newDeck => {
        dispatch(saveDeck(newDeck))
    })
}

export const fetchDecks = () => dispatch => {
    getDecks().then(data => {
        dispatch(saveDecks(data))
    })
}

export const addCard = (deckId, question, answer) => dispatch => {
    addCardToDeck(deckId, {question, answer}).then(deck => {
        dispatch(saveDeck(deck))
    })
}

export const saveDeck = (deck) => ({type: SAVE_DECK, deck})
export const saveDecks = (decks) => ({type: SAVE_DECKS, decks})