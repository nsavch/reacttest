import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { testReducer } from './reducers'
import socketMiddleware from './middleware'
import { createLogger } from 'redux-logger'


const loggerMiddleware = createLogger();


export default function configureStore(initialState) {
    return createStore(testReducer, initialState,
        applyMiddleware(thunk, socketMiddleware, loggerMiddleware)
    )
}
