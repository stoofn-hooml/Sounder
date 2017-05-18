import React from 'react';
import Select from 'react-select';

const GENREOPS = [
  { value: 'Alternative Rock', label: 'Alternative Rock' },
  { value: 'Ambient', label: 'Ambient' },
  { value: 'Classical', label: 'Classical' },
  { value: 'Country', label: 'Country' },
  { value: 'Dance & EDM', label: 'Dance & EDM' },
  { value: 'Dancehall', label: 'Dancehall' },
  { value: 'Deep House', label: 'Deep House' },
  { value: 'Disco', label: 'Disco' },
  { value: 'Drum & Bass', label: 'Drum & Bass' },
  { value: 'Dubstep', label: 'Dubstep' },
  { value: 'Electronic', label: 'Electronic' },
  { value: 'Folk & Singer-Songwriter', label: 'Folk & Singer-Songwriter' },
  { value: 'Hip-Hop & Rap', label: 'Hip-Hop & Rap' },
  { value: 'House', label: 'House' },
  { value: 'Indie', label: 'Indie' },
  { value: 'Jazz & Blues', label: 'Jazz & Blues' },
  { value: 'Latin', label: 'Latin' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Piano', label: 'Piano' },
  { value: 'Pop', label: 'Pop' },
  { value: 'R&B & Soul', label: 'R&B & Soul' },
  { value: 'Reggae', label: 'Reggae' },
  { value: 'Reggaeton', label: 'Reggaeton' },
  { value: 'Rock', label: 'Rock' },
  { value: 'Soundtrack', label: 'Soundtrack' },
  { value: 'Techno', label: 'Techno' },
  { value: 'Trance', label: 'Trance' },
  { value: 'Trap', label: 'Trap' },
  { value: 'Triphop', label: 'Triphop' },
  { value: 'World', label: 'World' }
];

var MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
    handleSelectChange: React.PropTypes.func,
    value: React.PropTypes.string
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: GENREOPS,
			value: '',
		};
	},
	handleSelectChange (value) {
		this.setState({ value });
	},

	render () {
		return (
			<div className="section">
				<Select multi simpleValue disabled={this.state.disabled} value={this.props.value} placeholder="Select your genres" options={this.state.options} onChange={this.props.handleSelectChange} />
			</div>
		);
	}
});

module.exports = MultiSelectField;
