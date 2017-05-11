import React, { Component } from 'react';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";



class NotifierGenerator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			position: "bottom-right",
			alerts: [],
			timeout: 10000,
			newMessage: "You matched with snuggle head!"
		};
	}

	generate(type) {
		const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: `Whoa, ${type}!`,
			message: this.state.newMessage
		};

		this.setState({
			alerts: [...this.state.alerts, newAlert]
		});
	}

	onAlertDismissed(alert) {
		const alerts = this.state.alerts;

		// find the index of the alert that was dismissed
		const idx = alerts.indexOf(alert);
		console.log("ditched this alert!" + idx);
		if (idx >= 0) {
			this.setState({
				// remove the alert from the array

				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

	clearAlerts() {
		this.setState({
			alerts: []
		});
	}

	onTimeoutChange({ target: { value } }) {
		this.setState({ timeout: (+value) * 1000 });
	}

	onNewMessageChange({ target: { value } }) {
		this.setState({ newMessage: value });
	}

	onPositionChange({ target: { value } }) {
		this.setState({
			position: value
		});
	}

	render() {
		const clearAllButton = this.state.alerts.length ? (
			<button
				className="btn btn-link"
				onClick={this.clearAlerts.bind(this)}>Clear all alerts</button>
		) : null;

		return (
			<div>
				<AlertList
					position={this.state.position}
					alerts={this.state.alerts}
					timeout={this.state.timeout}
					dismissTitle="Begone!"
					onDismiss={this.onAlertDismissed.bind(this)}
				/>



				<div className="form-group text-right">
					{clearAllButton}
					<div className="btn-group">
						{["info", "success", "warning", "danger"].map(type => (
							<button
								key={type}
								type="button"
								className={`btn btn-${type}`}
								onClick={this.generate.bind(this, type)}
							>
								generate {" "} {type}
							</button>
						))}
					</div>
				</div>
			</div>
		);
	}
}
export default NotifierGenerator;
