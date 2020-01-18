import React, {Component} from 'react';
import {Form, Menu, Input, Header, Button} from 'semantic-ui-react';
import {Consumer} from '../Context';

export default class AdventureFilter extends Component {
	render() {
		return (
			<Consumer>
				{context => {
					const {minPrice, maxPrice, handleChange} = context;
					return (
						<Menu vertical className="adventure-filters-menu-box">
							<Menu.Item>
								<h3>Select Filters</h3>
							</Menu.Item>
							<Menu.Item>
								<Input placeholder="Sightseeing, Adrenaline etc..." id="searchbox" />
								<Button onClick={context.searchbarFilter}>Search</Button>
							</Menu.Item>

							<Menu.Item name="Price">
								<Header>Price</Header>
								<Form>
									<Form.Input
										type="range"
										name="minPrice"
										label={`Min Price: ${minPrice} AUD`}
										onChange={handleChange}
										step={10}
										min={0}
										max={200}
										value={minPrice}
									/>
									<Form.Input
										type="range"
										name="maxPrice"
										label={`Max Price: ${maxPrice} AUD`}
										onChange={handleChange}
										step={10}
										min={0}
										max={200}
										value={maxPrice}
									/>
								</Form>
							</Menu.Item>
						</Menu>
					);
				}}
			</Consumer>
		);
	}
}
