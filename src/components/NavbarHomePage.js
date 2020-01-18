import React, {Component} from 'react';
import {Grid, Responsive, Modal} from 'semantic-ui-react';
import './Navbar.css';
import NavbarLoginButton from './NavbarLoginButton';
import {Consumer} from '../Context';
import SignUpModal from './SignUpModal';
import {Link} from 'react-router-dom';
import TravelAlertModal from './TravelAlertModal';
import logoWhite from './logoWhite.png';

export default class NavbarHomePage extends Component {
	render() {
		return (
			<Grid className="navbar-wrapper-home" id="navbar-wrapper">
				<Grid.Row className="navbar-content">
					<Grid.Column floated="left" width={4} className="wide fluid">
						<Link to="/">
							<img src={logoWhite} alt="Logo" className="navbar-home-icon" />
						</Link>
					</Grid.Column>
					<Grid.Column textAlign="right" floated="right" width={4}></Grid.Column>

					<Responsive
						as={Grid.Column}
						minWidth={710}
						textAlign="right"
						floated="right"
						width={8}
						className="wide fluid">
						<div className="login-signup-btns">
							<span className="travel-alert-button">
								<TravelAlertModal color="white" />
							</span>
							<span className="navbar-login-btn-wrapper">
								<NavbarLoginButton color="white" />
							</span>

							<Consumer>
								{value => {
									return !value.user ? (
										<SignUpModal />
									) : (
										<React.Fragment></React.Fragment>
									);
								}}
							</Consumer>
						</div>
					</Responsive>
					<Responsive width={8} as={Grid.Column} maxWidth={710}>
						<Grid.Row>
							<Grid.Column
								width={8}
								textAlign="left"
								floated="left"
								className="wide-fluid travel-alert-button-smallscreen-homepage">
								<TravelAlertModal color="white" />
							</Grid.Column>
							<Grid.Column
								textAlign="right"
								floated="right"
								width={8}
								className="wide fluid"
								className="navbar-login-btn-wrapper-smallscreen-homepage">
								<NavbarLoginButton color="white" />
							</Grid.Column>
						</Grid.Row>
					</Responsive>
				</Grid.Row>
			</Grid>
		);
	}
}
