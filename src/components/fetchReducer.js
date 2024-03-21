import React from 'react'


const fetchReducer = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading: true
            }
        case 'success':
            return {
                ...state,
                loading: false,
                // data: action.payload
            }

        case 'error':
            return {
                ...state,
                loading: false,
                error: 'error'
            }

        default:
            break;
    }
    return state
}

export default fetchReducer
