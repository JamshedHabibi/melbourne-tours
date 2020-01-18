import React, {Component} from 'react';
import {Modal, Icon, Form, Button} from 'semantic-ui-react';
import {Consumer} from '../Context';
import {StyledFirebaseAuth} from 'react-firebaseui';
import firebase from 'firebase';
import './LoginModal.css';

export default class LogInModal extends Component {
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccess: () => false
		}
	};

	render() {
		return (
			<Consumer>
				{value => {
					return (
						<Modal
							trigger={
								<div onClick={value.handleLogInModalOpen}>
									<Icon name="user" />
									Log In
								</div>
							}
							open={value.logInModalOpen}
							onClose={value.handleLogInModalClose}
							className="login-modal">
							<Modal.Content className="login-modal-heading">
								<div>
									<h2>Log in to Melbourne Tours</h2>
								</div>
								<br />
								<div>
									<h4>
										Log in to add things to your wishlist and access your bookings from
										any device.
									</h4>
								</div>
							</Modal.Content>
							<Modal.Content className="login-modal-form">
								<Form className="ui container">
									<Form.Field>
										<StyledFirebaseAuth
											uiConfig={this.uiConfig}
											firebaseAuth={firebase.auth()}
										/>
									</Form.Field>
									<div className="login-modal-or">Or</div>
									<br />
									<Form.Field className="login-modal-email">
										<label>Email</label>
										<input
											className="login-modal-email-input"
											type="email"
											name="email"
											value={value.email}
											onChange={value.handleChange}
											placeholder="John_Doe@gmail.com"
										/>
									</Form.Field>
									<Form.Field className="login-modal-password">
										<label>Password</label>
										<input
											className="login-modal-password-input"
											type="password"
											name="password"
											value={value.password}
											onChange={value.handleChange}
											placeholder="Password"
										/>
									</Form.Field>
								</Form>

								<br />
								<div id="login-error-message"></div>
								<br />

								<Modal.Actions className="login-modal-submit">
									<Button onClick={value.logIn} color="green">
										Log In
									</Button>
								</Modal.Actions>
								<br />

								<div className="login-modal-change-modal">
									Don't have an account yet?
									<span
										className="login-modal-change-modal-color"
										onClick={() => {
											value.handleLogInModalClose();
											value.handleSignUpModalOpen();
										}}>
										{' '}
										Sign Up
									</span>
								</div>
							</Modal.Content>
						</Modal>
					);
				}}
			</Consumer>
		);
	}
}
