import {AsyncStorage} from 'react-native'

const DECK_STORAGE_KEY = 'UdaciDecks'

const initialData = {
    "React": {
        title: "React",
        questions: [
            {
                question: "Where does react came from",
                answers: [
                    {
                        body: "Facebook",
                        isRight: true
                    },
                    {
                        body: "Amazone",
                        isRight: false
                    },
                    {
                        body: "Google",
                        isRight: false
                    },
                    {
                        body: "Twitter",
                        isRight: false
                    }
                ]
            }
        ]
    }
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