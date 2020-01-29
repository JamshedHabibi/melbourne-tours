import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import './HomePage.css';
import {Link} from 'react-router-dom';
import NavbarHomePage from './NavbarHomePage';

export default class HomePage extends Component {
	render() {
		return (
			<div className="homepage">
				<div>
					<img className="background-img" width="1800" src="background.jpg" alt="" />
				</div>

				<Grid className="homepage-content">
					<Grid.Column width={16}>
						<Grid.Row className="homepage-main-title">
							<p className="homepage-main-title">Turn a trip into an adventure</p>
						</Grid.Row>

						<Grid.Row className="homepage-subtitle">
							<p className="homepage-subtitle">
								Unique experiences you'll want to tell the world about
							</p>
						</Grid.Row>

						<Grid.Row>
							<Link as="div" to="/tours">
								<div className="homepage-find-tours-button">
									<h5>FIND OUT MORE</h5>
								</div>
							</Link>
						</Grid.Row>
					</Grid.Column>
				</Grid>
				<NavbarHomePage />
			</div>
		);
	}
}
