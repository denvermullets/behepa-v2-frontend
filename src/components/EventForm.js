import React, { Component } from 'react';
import { Form, Input, Button, Dropdown, Checkbox } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const eventOptions = [
  { key: 'nf', value: 'nf', text: 'Nightfall'},
  { key: 'gos', value: 'gos', text: 'Garden of Salvation'},
  { key: 'lw', value: 'lw', text: 'Last Wish'},
  { key: 'levi', value: 'levi', text: 'Leviathan'},
  { key: 'sotp', value: 'sotp', text: 'Scourge of the Past'},
  
]



class EventForm extends Component {
  
  state = {
    event: '',
    dateTime: new Date(),
    helper: false,
    description: '',
  }

  onFormChange = (e, { name, value }) => {
      this.setState({ [name]: value })
  }
  
  handleDateChange = date => {
    this.setState({ dateTime: date })
  }

  handleToggle = () => {
    this.setState({ helper: !this.state.helper })
  }

  onSubmit = (prop) => {
    this.props.addNewEvent(this.state)
    this.setState({
      event: '',
      dateTime: new Date(),
      helper: false,
      description: '',
     })

  }

  render() {
    

    return (
      <>
      <br />
       {/* <Form onSubmit={(e) => this.props.addNewEvent(this.state)}> */}
       <Form onSubmit={this.onSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            name="event"
            label='Select Event'
            control={Dropdown}
            placeholder='Select Event'
            search
            selection
            options={eventOptions}
            onChange={this.onFormChange}
            value={this.state.event}
          />
          <Form.Field
            name="description"
            value={this.state.description}
            control={Input}
            label='Event Notes'
            placeholder='Flawless run etc'
            onChange={this.onFormChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>When</label>
          <Form.Field
            control={DatePicker}
            value={this.state.dateTime}
            // label="When"
            selected={this.state.dateTime}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="Pp"
          />
          <label>Helper needed</label>
          <Checkbox 
            toggle
            name="helper"
            checked={this.state.helper}
            onChange={this.handleToggle}
          />
          <Button type='submit'>Submit</Button>
        </Form.Group>
      </Form>
      </>
    );
  }
}

export default EventForm;