import React, {Component} from 'react';
import {Responsive, Item, Grid} from 'semantic-ui-react';
import {Consumer} from '../Context';
import BookedToursCard from './BookedToursCard';

export default class BookedTours extends Component {
	render() {
		return (
			<Consumer>
				{context => {
					return (
						<div>
							<h1 style={{textAlign: 'center', color: 'var(--mainBlue)'}}>
								Booked Tours
							</h1>
							<div floated="right">
								{context.bookedTours.length > 0 ? (
									<Item.Group relaxed>
										{context.bookedTours.map(item => {
											return (
												<BookedToursCard
													key={context.bookedTours.indexOf(item)}
													item={item}
												/>
											);
										})}
									</Item.Group>
								) : (
									<div className="adventures-no-results-response">
										You have not booked any tours
									</div>
								)}
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}
