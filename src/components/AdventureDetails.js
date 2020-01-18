import React, {Component} from 'react';
import {
	Grid,
	Breadcrumb,
	Image,
	Divider,
	Icon,
	List,
	Rating
} from 'semantic-ui-react';
import {Consumer} from '../Context';
import Navbar from './Navbar';
import './AdventureDetails.css';
import {Link} from 'react-router-dom';

export default class AdventureDetails extends Component {
	render() {
		return (
			<div className="adventure-detail-wrapper">
				<Consumer>
					{context => {
						const {selectedTourToView} = context;
						return selectedTourToView.length === 0 ? (
							<div>404 - Not Found</div>
						) : (
							<Grid className="adventure-detail-content ui container">
								<Grid.Row>
									<Breadcrumb className="adventure-detail-breadcrumb" icon="right angle">
										<Breadcrumb.Section key="Home">
											<Link to="/">Home</Link>
										</Breadcrumb.Section>
										<Breadcrumb.Divider icon="right chevron" />
										<Breadcrumb.Section key="Adventures">
											<Link to="/tours">Adventures</Link>
										</Breadcrumb.Section>
										<Breadcrumb.Divider icon="right chevron" />
										<Breadcrumb.Section key={selectedTourToView.name}>
											<strong style={{color: 'var(--mainBlue)'}}>
												{selectedTourToView.name}
											</strong>
										</Breadcrumb.Section>
									</Breadcrumb>
								</Grid.Row>
								<Grid.Row>
									<h1 style={{color: 'var(--mainBlue)'}}>{selectedTourToView.name}</h1>
								</Grid.Row>
								<Grid.Row>
									<Image src={selectedTourToView.images[0].source_url} fluid />
								</Grid.Row>
								<Grid.Row>
									<Grid.Column width={11}>
										<Grid.Row>
											<h3>{selectedTourToView.intro} </h3>
										</Grid.Row>

										<Grid.Row className="adventure-detail-highlights">
											<p className="adventure-detail-subtitle">Highlights</p>
											<Divider />
											<List bulleted>
												{selectedTourToView.highlights !== null ? (
													selectedTourToView.highlights.map(highlight => {
														return (
															<List.Item>
																<List.Content>
																	<p className="adventure-detail-subtitle-content">
																		{' '}
																		{highlight}
																	</p>
																</List.Content>
															</List.Item>
														);
													})
												) : (
													<List.Item>
														<List.Content>
															<p className="adventure-detail-subtitle-content">
																No highlights
															</p>
														</List.Content>
													</List.Item>
												)}
											</List>
										</Grid.Row>
										<Grid.Row className="adventure-detail-details">
											<p className="adventure-detail-subtitle">Details</p>
											<Divider />
											<p className="adventure-detail-subtitle-content">
												{selectedTourToView.content.sections[0].body.slice(
													3,
													selectedTourToView.content.sections[0].body.length - 4
												)}
											</p>
										</Grid.Row>
									</Grid.Column>
									<Grid.Column
										width={5}
										className="adventure-details-price-view-now-wrapper">
										<Grid.Row>
											<h5>
												From
												<div className="adventure-details-price-text">
													{selectedTourToView.price.amount}{' '}
													{selectedTourToView.price.currency}
												</div>
												per person
												<a
													as="a"
													target="_blank"
													href={selectedTourToView.vendor_tour_url}
													rel="noreferrer">
													<span className="adventure-details-view-now-button">
														<span className="adventure-details-view-now-button-text">
															Book now
														</span>
													</span>
												</a>
											</h5>
										</Grid.Row>
										{/*<Grid.Row className="adventure-details-add-to-wishlist-button">
											Add to Wishlist
											<Rating icon="heart" defaultRating={1} maxRating={1} />
                                                </Grid.Row>*/}
									</Grid.Column>
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
