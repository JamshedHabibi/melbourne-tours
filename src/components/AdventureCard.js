import React, {Component} from 'react';
import {Item, Grid, Rating} from 'semantic-ui-react';
import {Consumer} from '../Context';
import {Link} from 'react-router-dom';

export default class AdventureCard extends Component {
	render() {
		const {vendor_tour_url, images, name, price, intro} = this.props.item;
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
											Add to Wishlist{' '}
											<span>
												<Rating
													icon="heart"
													defaultRating={0}
													maxRating={1}
													value={this.props.item}
													onClick={() => context.addToWishList(this.props.item)}
												/>
											</span>{' '}
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
