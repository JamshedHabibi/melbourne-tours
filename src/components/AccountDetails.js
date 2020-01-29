import React, {Component} from 'react';
import {Icon, Grid, Form, Button, Item} from 'semantic-ui-react';
import {Consumer} from '../Context';
import './AccountDetails.css';
import Navbar from './Navbar';
import BookedTours from './BookedTours';

export default class AccountDetails extends Component {
	render() {
		return (
			<div className="account-details-page">
				<Consumer>
					{value => {
						return value.user === null ? (
							<Grid className="ui container account-details-page-content">
								<Grid.Row>
									<div className="account-details-page-title">
										<h1 style={{color: 'var(--mainBlue)'}}>Account Details</h1>
									</div>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column
										textAlign="center"
										className="wide fluid"
										floated="center">
										<div className="account-details-please-log-in-response">
											Please log in to view your account details
										</div>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						) : (
							<Grid className="ui container account-details-page-content">
								<Grid.Row>
									<div className="account-details-page-title">
										<h1 style={{color: 'var(--mainBlue)'}}>Account Details</h1>
									</div>
								</Grid.Row>
								<Grid.Row>
									<Item.Group>
										<Item className="account-details-page-info">
											<Item.Image
												size="medium"
												src={value.photoURL}
												className="account-details-page-info-image"
											/>

											<Item.Content
												verticalAlign="top"
												className="account-details-page-info-content">
												<Item.Header className="account-details-page-info-content-header">
													<h1 style={{color: 'var(--mainBlue)'}}>{value.name}</h1>
												</Item.Header>
												<Item.Meta className="account-details-page-info-content-bio">
													{value.accountBio}{' '}
													<span
														style={{paddingLeft: '1vw', cursor: 'pointer'}}
														onClick={value.changeAccountBio}>
														<Icon name="pencil" />
													</span>
													{value.editAccountBioActivated === false ? (
														<React.Fragment></React.Fragment>
													) : (
														<Form className="edit-account-bio">
															<Form.Field>
																<input
																	placeholder="I am looking for new, exciting adventures!"
																	value={value.accountBio}
																	id="new-bio-info"
																	name="accountBio"
																	onChange={value.handleChange}
																/>
															</Form.Field>
															<Button type="submit" onClick={value.submitNewBio}>
																Submit Bio
															</Button>
														</Form>
													)}
												</Item.Meta>
												<br />
												<Item.Description>
													<Grid>
														<Grid.Column width={8}>
															<Grid.Row>
																<h3 style={{color: 'var(--mainBlue)'}}>Email</h3>
															</Grid.Row>
															<Grid.Row>{value.email}</Grid.Row>
															<br />
															<Grid.Row>
																<h3 style={{color: 'var(--mainBlue)'}}>Verified</h3>
															</Grid.Row>
															<Grid.Row style={{textTransform: 'capitalize'}}>
																{value.verified.toString()}
															</Grid.Row>
														</Grid.Column>

														<Grid.Column width={8}>
															<Grid.Row>
																<h3 style={{color: 'var(--mainBlue)'}}>Account Created On: </h3>
															</Grid.Row>
															<Grid.Row>{value.dateAccountCreated}</Grid.Row>
															<br />
															<Grid.Row>
																<h3 style={{color: 'var(--mainBlue)'}}>Last Signed In</h3>
															</Grid.Row>
															<Grid.Row>{value.lastSignInDate}</Grid.Row>
														</Grid.Column>
													</Grid>
												</Item.Description>
												{value.verified === false ? (
													<React.Fragment>
														<Item.Extra>
															Please verify account to access all features
														</Item.Extra>
														<Item.Description>
															<Button
																onClick={() => {
																	value.sendEmailVerification();
																	document.getElementById('resend-verification').innerHTML =
																		'Sent! Please check your email.';
																}}>
																Resend Email Verification
															</Button>
															<div id="resend-verification"></div>
														</Item.Description>
													</React.Fragment>
												) : (
													<React.Fragment></React.Fragment>
												)}
											</Item.Content>
										</Item>
									</Item.Group>
								</Grid.Row>

								<Grid.Row style={{position: 'relative', top: '5vh'}}>
									<BookedTours />
								</Grid.Row>
							</Grid>
						);
					}}
				</Consumer>
				<Navbar />
			</div>
		);
	}
}
