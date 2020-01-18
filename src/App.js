import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Adventures from './components/Adventures';
import {Switch, Route, withRouter} from 'react-router-dom';
import AdventureDetails from './components/AdventureDetails';

export default class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/tours" component={Adventures} />
					<Route path="/details" component={AdventureDetails} />
				</Switch>
			</React.Fragment>
		);
	}
}
