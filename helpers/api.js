import {AsyncStorage} from 'react-native'
import { NOTIFICATIONS_KEY } from './notification';

const DECK_STORAGE_KEY = 'UdaciDecks'

export const initialData = {
    title: "React",
    questions: [
        {
            title: "Where does react came from",
            answers: [
                {
                    body: "Facebook",
                    isTruthy: true
                },
                {
                    body: "Amazone",
                    isTruthy: false
                },
                {
                    body: "Google",
                    isTruthy: false
                },
                {
                    body: "Twitter",
                    isTruthy: false
                }
            ]
        }
    ]
}

export async function loadInitialData () {
    await resetDb()
    return await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(initialData))
}

export async function getDecks() {
    const allData = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    return JSON.parse(allData)
}

export async function getDeck(id) {
    const decks = await getDecks()
    return decks[id]
}

export async function saveDeck (deck) {
    await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[deck.title]: deck}))
    return deck
}

export async function addCardToDeck (title, card) {
    const decks = await getDecks()
    const deck = decks[title]
    deck.questions.push(card)
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({...decks, [title]: deck}))
    return deck
}

export async function removeCardFromDeck (title, cardTitle) {
    const decks = await getDecks()
    const deck = decks[title]
    const newQuestions = deck.questions.filter(question => question.title !== cardTitle)
    deck.questions = newQuestions
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({...decks, [title]: deck}))
    return deck
}

export async function resetDb () {
    return AsyncStorage.removeItem(DECK_STORAGE_KEY).then(AsyncStorage.removeItem(NOTIFICATIONS_KEY))
} 