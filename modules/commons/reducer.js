
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

function commonReducer(state=initialState, action) {
    switch (action.type) {
        default:
        return state
    }
}

export default {
    commons: commonReducer
}
