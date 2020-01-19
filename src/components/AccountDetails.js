import React, {Component} from 'react';
import {Modal, Icon, Form, Button, Grid} from 'semantic-ui-react';
import {Consumer} from '../Context';
import './LoginModal.css';

export default class AccountDetails extends Component {
	render() {
		return (
			<Consumer>
				{value => {
					return (
						<Modal
							trigger={
								<div onClick={value.handleAccountDetailsModalOpen}>
									<Icon name="user" />
									Account Details
								</div>
							}
							open={value.accountDetailsModalOpen}
							onClose={value.handleAccountDetailsModalClose}
							className="login-modal">
							<Modal.Content className="login-modal-heading">
								<div>
									<h2 style={{color: 'var(--mainBlue)'}}>Account Details</h2>
								</div>
								<br />
							</Modal.Content>
							<Modal.Content className="login-modal-form">
								<Grid className="ui container">
									<Grid.Row>
										<Grid.Column width={16} textAlign="center">
											<img src={value.photoURL} alt="avatar" width="180px" />
										</Grid.Column>
									</Grid.Row>

									<br />
									<Grid.Row>
										<Grid.Column width={16} textAlign="center">
											<h3 style={{color: 'var(--mainBlue)'}}>Account Created On</h3>
											<div style={{fontSize: '1.2em', color: 'rgb(0,0,0,0.6)'}}>
												{value.dateAccountCreated}
											</div>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={16} textAlign="center">
											<h3 style={{color: 'var(--mainBlue)'}}>Last Logged In</h3>
											<div style={{fontSize: '1.2em', color: 'rgb(0,0,0,0.6)'}}>
												{value.lastSignInDate}
											</div>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={16} textAlign="center">
											<h3 style={{color: 'var(--mainBlue)'}}>Name</h3>
											<div style={{fontSize: '1.2em', color: 'rgb(0,0,0,0.6)'}}>
												{value.name}
											</div>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={16} textAlign="center">
											<h3 style={{color: 'var(--mainBlue)'}}>Email</h3>
											<div style={{fontSize: '1.2em', color: 'rgb(0,0,0,0.6)'}}>
												{value.email}
											</div>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Modal.Content>
						</Modal>
					);
				}}
			</Consumer>
		);
	}
}
