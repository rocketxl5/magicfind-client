const ACTIONS = {
    INPUT: {
        CHANGE: 'change',
        FOCUS: 'focus',
        BLUR: 'blur',
        SUBMIT: 'submit'
    },
    CARD: {
        STATIC: 'static',
        FLIP: 'flip',
        ROTATE: 'rotate',
        TURN: 'turn'
    },
    SLIDE: {
        RESET: 0,
        INTERVAL: 100,
        LIMIT: { MIN: 0, MAX: 0 }
    }
}

export default ACTIONS;