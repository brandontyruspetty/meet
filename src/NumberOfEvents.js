import React, { Component } from "react";
import { ErrorAlert } from './Alert'

class NumberOfEvents extends Component {
  state = { 
    noe: 32,
    errorText: ''
   }

  handleInputChanged = (event, props) => {
    const inputValue = event.target.value;
    if(inputValue < 1 || inputValue > 32) {
    this.setState({
      errorText: 'Please select number from 1 to 32'
    })
    } else {
      this.props.updateEvents(null, inputValue);
      this.setState({ 
        noe: inputValue,
        errorText: '' 
      });
    }
  }

  render() {
    const { noe } = this.state;
    return (
      <div className="numberOfEvents">
        <h3>Number of Events:</h3>
        <ErrorAlert text={this.state.errorText} />
        <input
          className="noe-input"
          type="number"
          value={noe}
          onChange={event => {
            this.handleInputChanged(event);
          }}
        >
        </input>
      </div>
    )
  }
}

export default NumberOfEvents;