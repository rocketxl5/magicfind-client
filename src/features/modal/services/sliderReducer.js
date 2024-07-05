export const sliderReducer = (state, action) => {
    switch (action.type) {
        case 'set-offset':
            return {
                ...state,
                offset: action.payload
            }
        case 'set-indicator':
            return {
                ...state,
                indicator: action.payload
            }
        case 'set-interval':
            return {
                ...state,
                interval: action.payload
            }
        case 'set-slider':
            return {
                ...state,
                ...action.payload
            }
        case 'set-slide':
            return {
                ...state,
                slide: action.payload
            }
        case 'set-swipe':
            return {
                ...state,
                swipe: action.payload
            }
        case 'set-timeout':
            return {
                ...state,
                scrollTimeout: action.payload
            }
        default:
            return null;
    }
}