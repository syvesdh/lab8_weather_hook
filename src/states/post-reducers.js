import axios from "axios";

/* Posts */

const initPostState = {
    postLoading: false,
    posts: [],
    hasMore: true
};

export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LOADING':
            return {
                ...state,
                postLoading: false
            };
        case '@POST/END_LIST_POSTS':
            return {
                ...state,
                posts: action.posts,
                hasMore: action.posts.length > 0
            };
        case '@POST/END_LIST_MORE_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                hasMore: action.posts.length > 0
            };
        case '@POST/END_CREATE_VOTE':
            var newPosts = state.posts.map(p => {
                if (p.id === action.post.id)
                    return action.post;
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        case '@POST/END_CREATE_POST':
            var newPosts = state.posts.map(p => {
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        default:
            return state;
    }
}

/* Search text */

export function searchText(state = '', action) {
    return 0;
    //TODO
}


/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na'
};

export function postForm(state = initPostFormState, action) {
    //TODO
    switch (action.type) {
        case '@POSTFORM/INPUT':
            return{
                ...state,
                inputValue: action.value
            };
        case '@POSTFORM/INPUT_DANGER':
            return{
                ...state,
                inputDanger: action.danger
            };
        case '@POSTFORM/TOGGLE_MOOD':
            return{
                ...state,
                moodToggle: !state.moodToggle
            };
        case '@POSTFORM/SET_MOOD_TOGGLE':
            return{
                ...state,
                moodToggle: action.toggle
            };
        case '@POSTFORM/SELECT_MOOD':
            return{
                ...state,
                mood: action.mood
            };
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {}
};

export function postItem(state = initPostItemState, action) {
    //TODO
    return 0;
}