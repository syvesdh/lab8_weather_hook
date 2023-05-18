import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from 'api/posts.js';

/*  Posts */

function startLoading() {
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(searchText).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

export function createPost(mood, text) {
    //TODO
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createPostFromApi(mood, text).then(() => {
            console.log("createPost in")
            dispatch(listPosts())
            console.log("createPost out")
        }).catch(e => {
            console.log("createPost fucked up")
        }).then(() => dispatch(endCreatePost()))
    }
};

export function createVote(id, mood) {
    //TODO
    return (dispatch, getState) => {
        dispatch(startLoading());
        return createVoteFromApi(id, mood).then(() => {
            console.log("createVote in")
            dispatch(listPosts())
            console.log("createVote out")
        }).catch(e => {
            console.log("createVote fucked up")
        }).then(() => dispatch(endLoading()))
    }
};

/*  Search text */

export function setSearchText(searchText) {
    // TODO

    return {
        type: '@SEARCH_TEXT/SET_SEARCH_TEXT',
        searchText
    }
}

/*  Post Form */

export function input(value) {
    //TODO
    return {
        type: '@POST_FORM/INPUT',
        value
    }
};

export function inputDanger(danger) {
    //TODO
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    }
};

export function toggleMood() {
    //TODO
    return {
        type: '@POST_FORM/TOGGLE_MOOD'
    }
};

export function setMoodToggle(toggle) {
    //TODO
    return {
        type: '@POST_FORM/SET_MOOD_TOGGLE',
        toggle
    }
};

export function selectMood(mood) {
    //TODO
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood
    }
};

/*  Post item */

export function toggleTooltip(id) {
     //TODO
     return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
     }
};

export function setTooltipToggle(id, toggle) {
    //TODO
    
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id,
        toggle
    }
};
