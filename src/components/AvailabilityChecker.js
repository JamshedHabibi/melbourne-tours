import React, {Component} from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

export default class AvailabilityChecker extends Component {
	render() {
		return (
			<div>
				<div className="adventures-date-selector-header">
					<h3>Enter your dates to find available activities:</h3>
				</div>
				<div className="adventures-date-selector-inputs">
					<div className="adventures-date-selector">
						<SemanticDatepicker />
					</div>

					<div className="adventures-date-selector">
						<SemanticDatepicker />
					</div>
				</div>

				<div className="adventures-date-availability-checker-wrapper">
					<p className="adventures-date-availability-checker">Check Availability</p>
				</div>
			</div>
		);
	}
}
