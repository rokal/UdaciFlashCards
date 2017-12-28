import {values} from 'lodash'

export const getDecks = (state) => {
    return values(state.decks.byId).map((deck, index) => ({...deck, key: deck.title}))
}