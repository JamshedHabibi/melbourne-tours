import React, {Component} from 'react';
import './Adventures.css';
import {
	Item,
	Segment,
	Dimmer,
	Loader,
	Grid,
	Dropdown,
	Breadcrumb,
	Responsive,
	Icon,
	Button
} from 'semantic-ui-react';
import {Consumer} from '../Context';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import AvailabilityChecker from './AvailabilityChecker';
import AdventureFilter from './AdventureFilter';
import AdventureCard from './AdventureCard';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
export default class Adventures extends Component {
	state = {};

	render() {
		const sortByOptions = [
			{key: 1, value: 1, text: 'Recommended'},
			{key: 2, value: 2, text: 'Price (Low to High)'},
			{key: 3, value: 3, text: 'Price (High to Low)'}
		];
		const {value} = this.state;

		return (
			<div className="adventures-wrapper">
				<Consumer>
					{context => {
						return !context.apiIsLoaded ? (
							<Segment className="loader-before-api-is-loaded">
								<Dimmer active inverted>
									<Loader inverted content="Loading" />
								</Dimmer>
							</Segment>
						) : (
							<div className="adventures-content">
								<Grid className="ui container adventures-header">
									<Grid.Row>
										<Breadcrumb style={{paddingLeft: '1vw'}} icon="right angle">
											<Breadcrumb.Section key="Home">
												<Link to="/">Home</Link>
											</Breadcrumb.Section>
											<Breadcrumb.Divider icon="right chevron" />
											<Breadcrumb.Section key="Adventures">
												<strong style={{color: 'var(--mainBlue)'}}>Adventures</strong>
											</Breadcrumb.Section>
										</Breadcrumb>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6}>
											<span className="results-found">
												<strong>Results: </strong> {context.adventures.length} found
											</span>
											<Responsive
												as="div"
												maxWidth={992}
												className="adventures-select-filter-small-screen">
												<Button
													icon
													labelPosition="left"
													onClick={context.activateFilterPanel}>
													<Icon name="filter" />
													Filters
												</Button>
											</Responsive>
										</Grid.Column>
										<Grid.Column floated="right" width={4}>
											<span floated="right" className="adventures-sort-by-option">
												Sort By:{' '}
												<Dropdown
													placeholder="Recommended"
													options={sortByOptions}
													selection
													value={value}
													onChange={(e, {value}) =>
														this.setState({value}, () => {
															if (this.state.value === 1) context.sortToursByRecommended();
															if (this.state.value === 2) context.sortToursByPriceLowToHigh();
															if (this.state.value === 3) context.sortToursByPriceHighToLow();
														})
													}
												/>
											</span>
										</Grid.Column>
									</Grid.Row>
								</Grid>

								<Grid className="ui container">
									<Responsive
										as={Grid.Column}
										minWidth={992}
										width={4}
										floated="left"
										className="adventures-filter-side-panels">
										<Grid.Row className="adventures-date-selector-wrapper">
											<AvailabilityChecker />
										</Grid.Row>
										<Grid.Row className="adventure-filters">
											<AdventureFilter />
										</Grid.Row>
									</Responsive>
									<Responsive as={Grid.Column} maxWidth={992} width={16} floated="left">
										<div
											className="adventures-filter-side-panels"
											id="adventures-filter-side-panels">
											<Grid.Row>
												<div className="adventures-filter-side-panels-close-btn">
													<Icon name="close" onClick={context.activateFilterPanel} />
												</div>
											</Grid.Row>
											<Grid.Row className="adventures-date-selector-wrapper">
												<AvailabilityChecker />
											</Grid.Row>
											<Grid.Row className="adventure-filters">
												<AdventureFilter />
											</Grid.Row>
										</div>
									</Responsive>

									<Responsive as={Grid.Column} minWidth={992} width={12} floated="right">
										{context.adventures.length > 0 ? (
											<Item.Group relaxed>
												{context.adventures.map(item => {
													return <AdventureCard key={item.id} item={item} />;
												})}
											</Item.Group>
										) : (
											<div className="adventures-no-results-response">
												No results for your search criteria
											</div>
										)}
									</Responsive>
									<Responsive as={Grid.Column} maxWidth={992} width={16} floated="right">
										{context.adventures.length > 0 ? (
											<Item.Group relaxed className="adventures-results-smallscreen">
												{context.adventures.map(item => {
													return <AdventureCard key={item.id} item={item} />;
												})}
											</Item.Group>
										) : (
											<div className="adventures-no-results-response">
												No results for your search criteria
											</div>
										)}
									</Responsive>
								</Grid>
							</div>
						);
					}}
				</Consumer>
				<Navbar />
			</div>
		);
	}
}
