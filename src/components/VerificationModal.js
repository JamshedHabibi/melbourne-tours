import React, {Component} from 'react';
import {Consumer} from '../Context';
import {Modal, Button} from 'semantic-ui-react';

export default class VerificationModal extends Component {
	render() {
		return (
			<Consumer>
				{value => {
					return (
						<Modal
							dimmer="inverted"
							trigger={
								<span
									className="adventure-details-view-now-button"
									onClick={() => {
										if (value.user === null) {
											value.handleLogInModalOpen();
										} else {
											value.handleVerificationModalOpen();
										}
									}}>
									<span className="adventure-details-view-now-button-text">
										Book now
									</span>
								</span>
							}
							open={value.verificationModalOpen}
							onClose={value.handleVerificationModalClose}>
							<Modal.Header>Account verification required </Modal.Header>
							<Modal.Content>
								<p style={{fontSize: '1.2em'}}>
									Please verify your account. A verification link has been sent your
									email
								</p>
							</Modal.Content>
							<Modal.Actions>
								<Button content="Ok" onClick={value.handleVerificationModalClose} />
							</Modal.Actions>
						</Modal>
					);
				}}
			</Consumer>
		);
	}
}
