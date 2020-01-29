import React, {Component} from 'react';
import {Modal, Icon, Header} from 'semantic-ui-react';
import './TravelAlertModal.css';
export default class TravelAlertModal extends Component {
	render() {
		return (
			<Modal
				trigger={
					<p style={{color: this.props.color}}>
						<Icon name="question circle" /> TRAVEL ALERT
					</p>
				}
				basic
				size="small">
				<Header textAlign="center" className="travel-alert-modal-header">
					TRAVEL ALERT
				</Header>

				<Modal.Content className="travel-alert-modal-content">
					<p>
						Bushfires are currently impacting Victoria's East Gippsland and High
						Country regions. However, many parts of the State are unaffected by the
						fires at this time and are welcoming visitors. For all incidents and
						warnings see:{'   '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="http://www.emergency.vic.gov.au/respond/">
							emergency.vic.gov.au.
						</a>{' '}
						Stay up to date on road closures at:{'  '}
						<a
							target="_blank"
							href="https://traffic.vicroads.vic.gov.au/"
							rel="noopener noreferrer">
							traffic.vicroads.vic.gov.au.
						</a>
					</p>
				</Modal.Content>
			</Modal>
		);
	}
}
