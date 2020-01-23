import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Adventures from './components/Adventures';
import {Switch, Route, withRouter} from 'react-router-dom';
import AdventureDetails from './components/AdventureDetails';
import Wishlist from './components/Wishlist';
import AccountDetails from './components/AccountDetails';
import NotFound from './components/NotFound';

export default class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/tours" component={Adventures} />
					<Route path="/details" component={AdventureDetails} />
					<Route path="/wishlist" component={Wishlist} />
					<Route path="/account" component={AccountDetails} />
					<Route component={NotFound} />
				</Switch>
			</React.Fragment>
		);
	}
}
