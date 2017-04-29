import 'whatwg-fetch';

// here go action definitions

export function connect(url) {
    return (dispatch, getState) => {
        if (! getState().connected) {
            dispatch({
                type: 'CONNECT',
                url: url
            })
        }
        setTimeout(() => dispatch(connect(url)), 1000 + Math.random() * 1000);
    }
}

export function connecting() {
    return {
        type: 'CONNECTING'
    }
}

export function connected() {
    return {
        type: 'CONNECTED'
    }
}

export function disconnected() {
    return {
        type: 'DISCONNECTED'
    }
}


export function messageReceived(msg) {
    return {
        type: 'MESSAGE_RECEIVED',
        message: msg
    }
}


export function sendMessage(obj) {
    return {
        type: 'SEND_MESSAGE',
        data: obj
    }
}


export function messageSent(obj) {
    return {
        type: 'MESSAGE_SENT',
        data: obj
    }
}
