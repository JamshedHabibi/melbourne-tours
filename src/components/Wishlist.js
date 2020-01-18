import React, {Component} from 'react';
import {Consumer} from '../Context';
import LogInModal from './LogInModal';
import Navbar from './Navbar';
import './Wishlist.css';
import {Grid, Breadcrumb, Item} from 'semantic-ui-react';
import WishlistAdventureCard from './WishlistAdventureCard';
import {Link} from 'react-router-dom';

export default class Wishlist extends Component {
	render() {
		return (
			<div className="wishlist">
				<Consumer>
					{value => {
						return (
							<div className="wishlist-content ui container">
								<Breadcrumb style={{paddingTop: '8vh'}} icon="right angle">
									<Breadcrumb.Section key="Home">
										<Link to="/">Home</Link>
									</Breadcrumb.Section>
									<Breadcrumb.Divider icon="right chevron" />
									<Breadcrumb.Section key="Wishlist">
										<strong style={{color: 'var(--mainBlue)'}}>Wishlist</strong>
									</Breadcrumb.Section>
								</Breadcrumb>
								<div className="wishlist-title">
									<h2>Your Wishlist</h2>
									<div className="wishlist-length">{value.wishlist.length} item(s)</div>
								</div>

								{!value.user ? (
									<Grid>
										<Grid.Row>
											<Grid.Column textAlign="center" width={16}>
												<p className="wishlist-error-message">
													Please log in to view your wishlist
												</p>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								) : value.wishlist.length === 0 ? (
									<Grid>
										<Grid.Row>
											<Grid.Column textAlign="center" width={16}>
												<p className="wishlist-error-message">Your wishlist is empty</p>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								) : (
									<Item.Group relaxed className="wishlist-listings">
										{value.wishlist.map(item => {
											return <WishlistAdventureCard key={item.id} item={item} />;
										})}
									</Item.Group>
								)}
							</div>
						);
					}}
				</Consumer>
				<Navbar />
			</div>
		);
	}
}
