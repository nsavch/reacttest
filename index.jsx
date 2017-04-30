import configureStore from './store'
import {Provider, connect} from 'react-redux'
import * as actions from './actions'
import { initialState } from './reducers'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import ReactDOM from "react-dom"
import React from 'react'

const store = configureStore(initialState);
const history = createBrowserHistory();


class Home extends React.Component {
    render () {
        return <h2>Home Sweet Home</h2>
    }
}

class About extends React.Component {
    render () {
        return <h2>we are cool, no doubt</h2>
    }
}


class App extends React.Component {
    componentDidMount() {

    }

    render() {
        return <Router history={history}>
            <div>
                <h1>Hello, {this.props.greeting}</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    }
}

App = connect((state)  => {return {}})(App);


ReactDOM.render(
    <Provider store={store}>
        <App greeting="Clan.exe" />
    </Provider>,
    document.getElementById('app')
);
