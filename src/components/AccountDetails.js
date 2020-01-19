import React, {Component} from 'react';
import {Grid, Icon, GridColumn} from 'semantic-ui-react';
import {Consumer} from '../Context';
import NavbarHomePage from './NavbarHomePage';
import './AccountDetails.css';

export default class AccountDetails extends Component {
	render() {
		return (
			<div className="account-details-page">
				<div>
					<img
						className="background-img"
						width="1800"
						style={{filter: 'brightness(30%)'}}
						src="background.jpg"
						alt=""
					/>
				</div>
				<Grid className="ui container account-details-content ">
					<Grid.Row style={{paddingLeft: '1vw', color: 'white'}}>
						<h2>Account Details</h2>
					</Grid.Row>
					<Consumer>
						{value => {
							return (
								<Grid.Row className="account-details-content-information">
									<Grid.Column width={5}>
										<Grid.Row>
											<img src={value.photoURL} alt="avatar" width="240px" />
										</Grid.Row>
										<br />
										<Grid.Row style={{paddingLeft: '2vw'}}>
											<h3>Account Created On: </h3>
											<div
												style={{
													fontSize: '1.3em',
													color: 'rgb(0,0,0,0.4)',
													position: 'relative',
													left: '-2vw'
												}}>
												{value.dateAccountCreated}
											</div>
										</Grid.Row>
									</Grid.Column>
									<Grid.Column width={10} style={{paddingTop: '3vh'}}>
										<Grid.Row>
											<h3>Last Signed In:</h3>
										</Grid.Row>
										<Grid.Row style={{fontSize: '1.3em', color: 'rgb(0,0,0,0.4)'}}>
											{value.lastSignInDate}
										</Grid.Row>
										<br />
										<Grid.Row>
											<h3>Name:</h3>
										</Grid.Row>
										<Grid.Row style={{fontSize: '1.3em', color: 'rgb(0,0,0,0.4)'}}>
											{value.name}
										</Grid.Row>
										<br />
										<Grid.Row>
											<h3>Email: </h3>
										</Grid.Row>
										<Grid.Row style={{fontSize: '1.3em', color: 'rgb(0,0,0,0.4)'}}>
											{value.email}
										</Grid.Row>
									</Grid.Column>
								</Grid.Row>
							);
						}}
					</Consumer>
				</Grid>
				<NavbarHomePage />
			</div>
		);
	}
}
