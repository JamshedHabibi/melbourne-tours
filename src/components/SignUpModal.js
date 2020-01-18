import React, {Component} from 'react';
import {Button, Checkbox, Form, Modal} from 'semantic-ui-react';
import {Consumer} from '../Context';
import firebase from 'firebase';
import {StyledFirebaseAuth} from 'react-firebaseui';

export default class SignUpForm extends Component {
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
								<span
									onClick={value.handleSignUpModalOpen}
									className="navbar-sign-up-btn">
									<span className="navbar-sign-up-btn-content">Sign Up</span>
								</span>
							}
							open={value.signUpModalOpen}
							onClose={value.handleSignUpModalClose}
							className="login-modal">
							<Modal.Content className="login-modal-heading">
								<div>
									<h2>Sign up to Melbourne Tours</h2>
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
									<Form.Field className="login-modal-name">
										<label>Name</label>
										<input
											className="login-modal-name-input"
											type="text"
											name="signUpName"
											value={value.signUpName}
											onChange={value.handleChange}
											placeholder="John Doe"
										/>
									</Form.Field>

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
									<br />
									<Form.Field className="login-modal-marketing-emails">
										<Checkbox label="Yes, sign me up to recieve information about new tours, attractions, deals and discounts." />
									</Form.Field>
								</Form>
								<br />
								<div id="sign-up-error-message"></div>
								<br />
								<Modal.Actions className="login-modal-submit">
									<Button onClick={value.signUp} color="green">
										Sign Up
									</Button>
								</Modal.Actions>
								<br />
								<div className="login-modal-change-modal">
									Already have an account?
									<span
										className="login-modal-change-modal-color"
										onClick={() => {
											value.handleSignUpModalClose();
											value.handleLogInModalOpen();
										}}>
										{' '}
										Log in
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
