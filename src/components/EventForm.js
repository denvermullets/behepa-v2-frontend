import React, { Component } from 'react';
import { Form, Input, Select, Dropdown } from 'semantic-ui-react'

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
    date: '',
    time: '',
    helper: false,
    description: '',
  }

  onFormChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  handleSubmit = () => {
    //
  }

  

  render() {
    return (
      <>
      <br />
       <Form onSubmit={(e) => this.props.addNewEvent(this.state)}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Middle name</label>
            <Input fluid placeholder='Middle name' />
          </Form.Field>
          <Form.Field
            control={Select}
            label='Gender'
            options={options}
            placeholder='Gender'
          />
          <Form.Field
            name="event"
            label='Select Event'
            control={Dropdown}
            placeholder='Select Event'
            search
            selection
            options={eventOptions}
            onChange={this.onFormChange}
          />
          <Form.Field
            control={Input}
            label='Event Notes'
            placeholder='Flawless run etc'
          />
        </Form.Group>
      </Form>
      </>
    );
  }
}

export default EventForm;