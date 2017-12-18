import {get} from 'lodash'

import {SAVE_DECK, SAVE_DECKS} from './actions'
const initialState = {
    byId: {}
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SAVE_DECK: 
            const decksById = get(state, 'byId')
            decksById[action.deck.title] = action.deck
            const newState = {...state}
            newState.byId = decksById
            return newState
        case SAVE_DECKS:
            return {...state, byId: action.decks}
        default:
            return state
    }
}