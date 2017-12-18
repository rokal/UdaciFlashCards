import {AsyncStorage} from 'react-native'

const DECK_STORAGE_KEY = 'UdaciDecks'

export async function getDecks() {
    const allData = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    return JSON.parse(allData)
}

export async function getDeck(id) {
    const decks = await getDecks()
    return decks[id]
}

export async function saveDeckTitle (title) {
    const newDeck = {title, questions: []}
    await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[title]: newDeck}))
    return newDeck
}

export async function addCardToDeck (title, card) {
    const decks = await getDecks()
    const deck = decks[title]
    deck.questions.push(card)
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({...decks, [title]: deck}))
    return deck
}

export async function resetDb () {
    return AsyncStorage.removeItem(DECK_STORAGE_KEY)
} 