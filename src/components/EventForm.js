import React, { Component } from 'react';

class EventForm extends Component {
  state = {
    event: '',
    date: '',
    time: '',
    helper: false,
    description: '',
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  onDateChange = (date,dateString) => {
    // function(date: moment, dateString: string)
    // console.log(date, dateString)
    this.setState({ date: dateString })

  }
  onTimeChange = (time, timeString) => {
    // function(date: moment, dateString: string)
    this.setState({ time: timeString })
    
  }

  onEventChange = (value) => {
    this.setState({ event: value })
  }

  onCheckedChange = (e) => {
    this.setState({ helper: e.target.checked })
  }

  // handleSubmit = () => {
  //   // form doesn't pass values for some reason, temp pass
  //   // current state values instead
  //   alert('hi buddy')
  // }

  render() {
    return (
      <>
       form_here
      </>
    );
  }
}

export default EventForm;