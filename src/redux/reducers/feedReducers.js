const initialState = {
    questionsFeed: null,
    blogsFeed: null
}


const Feed = (state= initialState, action) => {
    switch (action.type) {
        case 'SET_FEED_QUESTIONS':
            return {
                ...state,
                questionsFeed: action.payload,
            }
        case 'SET_FEED_BLOGS':
            return {
                ...state,
                blogsFeed: action.payload,
            }
        default:
            return state;
    }
}

export default Feed