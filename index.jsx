import configureStore from './store'
import {Provider, connect} from 'react-redux'
import * as actions from './actions'
import { initialState } from './reducers'

const ReactDOM = require("react-dom");
const React = require('react');

const store = configureStore(initialState);


class App extends React.Component {
    componentDidMount() {

    }

    render() {
        return <div>
            <h1>Hello, {this.props.greeting}</h1>
        </div>
    }
}

App = connect((state)  => {return {}})(App);


ReactDOM.render(
    <Provider store={store}>
        <App greeting="Clan.exe" />
    </Provider>,
    document.getElementById('app')
);
