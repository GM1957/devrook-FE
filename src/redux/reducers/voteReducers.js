const initialState = {
    votes: {},
}


const Vote = (state= initialState, action) => {
    switch (action.type) {
        case 'SET_VOTES':
            return {
                ...state,
                votes: action.payload,
            }
        default:
            return state;
    }
}

export default Vote