import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function paymentReducer(state = initialState.payment, action) {
    let clonedState = [...state];
    switch (action.type) {
        case types.PAYMENT_SUCCESS:
            clonedState.unshift({
                sender: action.user.sender.name,
                receiver: action.user.receiver.name,
                date: action.user.date,
                amount: action.user.amount,
                currency: action.user.currency,
            });
            return clonedState;
        // case types.USER_SUCCESS:
        //   return Object.assign({}, state, { email: action.user.email });
        default:
            return state;
    }
}
