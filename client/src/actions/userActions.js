import * as types from './actionTypes';

export function users_Success(user) {
    return {
        type: types.USERS_SUCCESS,
        user
    };
}

export function users_Fail(user) {
    return {
        type: types.USERS_FAIL,
        user
    };
}

export function getUsers() {
    return function (dispatch) {
        return fetch('http://localhost:8080/users')
            .then(async response => {
                const dataObj = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (dataObj && dataObj.message) || response.statusText;
                    return dispatch(users_Fail(error));
                }
                dispatch(users_Success(dataObj.data));
            })
            .catch(error => {
                dispatch(users_Fail(error));
                console.error('There was an error!', error);
            });
    };
}