import * as types from './actionTypes';
export function payment_Success(user) {
  return { 
    type: types.PAYMENT_SUCCESS, 
    user
   };
}

export function user_Success(user) {
  return { 
    type: types.USER_SUCCESS, 
    user
   };
}

export function setPayment(data) {
    return function (dispatch) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch('http://localhost:8080/payments',requestOptions)
        .then(async response => {
            console.log("response>>",response)
            const dataObj = await response;

            // check for error response
            if (!response.ok) {
                if(response.status === 503) {
                    dispatch(setPayment(data));
                    return false;
                }
                // get error message from body or default to response statusText
                const error = (dataObj && dataObj.error) || response.statusText;
                console.error('There was an error!', error);
            } else {
                dispatch(payment_Success(data));
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
}

export function getPayment() {
  return function (dispatch) {
    return fetch('http://localhost:8080/payments')
    .then(async response => {
        const dataObj = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (dataObj && dataObj.error) || response.statusText;
            throw new Error(error);
        }

        dispatch(payment_Success(dataObj.data));
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  };
}



export function loadPaymentData() {
    return dispatch => {
        let arr = []
        for (var i = 1; i <= 20; i++) {
            arr.push(i)
        }

        Promise.all(
            arr.map(id => {
                return new Promise((resolve) => {
                    fetch(`http://localhost:8080/payments`)
                        .then(response => {
                            return new Promise(() => {
                                response.json()
                                    .then(todo => {
                                        console.log(todo.data)
                                        resolve()
                                    })
                            })
                        })
                })
            })
        )
    }
}

