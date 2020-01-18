import React, {Component} from 'react';
import {Item, Grid, Icon} from 'semantic-ui-react';
import {Consumer} from '../Context';
import {Link} from 'react-router-dom';

export default class AdventureCard extends Component {
	render() {
		const {vendor_tour_url, images, name, price, intro, id} = this.props.item;
		return (
			<Consumer>
				{context => {
					return (
						<Item className="adventure-item">
							<Item.Content>
								<Grid padded>
									<Grid.Column width={6}>
										<Link
											to="/details"
											onClick={() => context.viewSelectedTour(this.props.item)}>
											<Item.Image size="medium" src={images[0].source_url} />
										</Link>
									</Grid.Column>
									<Grid.Column width={10}>
										<Link
											to="/details"
											onClick={() => context.viewSelectedTour(this.props.item)}>
											<Item.Header>{name}</Item.Header>
											<Item.Meta></Item.Meta>
											<Item.Description
												style={{
													color: 'black'
												}}>
												{intro}
											</Item.Description>
											<Item.Extra>
												{price.amount}
												<span> {price.currency}</span>
											</Item.Extra>
										</Link>
										<Item.Extra>
											<Item.Group relaxed>
												{!context.wishlist.find(item => item.id === id) ? (
													<p
														style={{cursor: 'pointer'}}
														onClick={() => context.addToWishList(this.props.item)}>
														<span>
															<Icon name="heart" />
														</span>{' '}
														Add to Wishlist
													</p>
												) : (
													<p
														style={{cursor: 'pointer'}}
														onClick={() => context.removeFromWishList(this.props.item)}>
														<span>
															<Icon name="heart" style={{color: 'red'}} />
														</span>{' '}
														Remove from Wishlist
													</p>
												)}
											</Item.Group>
										</Item.Extra>
									</Grid.Column>
								</Grid>
							</Item.Content>
						</Item>
					);
				}}
			</Consumer>
		);
	}
}
