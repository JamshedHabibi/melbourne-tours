import React, {Component} from 'react';
import {Item, Grid, Icon} from 'semantic-ui-react';
import {Consumer} from '../Context';
import {Link} from 'react-router-dom';
import './BookedToursCard.css';

export default class AdventureCard extends Component {
	render() {
		const {images, name, intro, totalBookedCost, participants} = this.props.item;
		return (
			<Consumer>
				{context => {
					return (
						<Item className="booked-tours-item">
							<Item.Content>
								<Grid padded>
									<Grid.Column width={6}>
										<Link
											to="/details"
											onClick={() => context.viewSelectedTour(this.props.item)}>
											<Item.Image size="medium" src={images[0].source_url} />
										</Link>
									</Grid.Column>
									<Grid.Column width={5}>
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
										</Link>
									</Grid.Column>
									<Grid.Column width={5} floated="right" className="wide fluid">
										<Item.Header>
											<h3>Order Details: </h3>
										</Item.Header>
										<br />
										<Item.Description>
											<Grid.Row style={{color: 'var(--mainBlue)'}}>
												<strong>Total Cost:</strong>
											</Grid.Row>
											<Grid.Row>{totalBookedCost} AUD</Grid.Row>
											<Grid.Row style={{color: 'var(--mainBlue)'}}>
												<strong>Participants:</strong>
											</Grid.Row>
											<Grid.Row>x{participants}</Grid.Row>
										</Item.Description>
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
