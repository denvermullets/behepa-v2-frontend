import React, { Component } from 'react';
import * as moment from "moment" 
import { Segment, Header, Divider, Button } from 'semantic-ui-react'
import FireTeam from './FireTeam';

const destinyEvents = {
  levi: 'Leviathan',
  eow: 'Leviathan, Eater of Worlds',
  sos: 'Leviathan, Spire of Stars',
  lw: 'Last Wish',
  sotp: 'Scourge of the Past',
  cos: 'Crown of Sorrow',
  gos: 'Garden of Salvation',
  nf: 'Nightfall',
}

class SegmentEvent extends Component {

  state = {
    fireTeam: [],
  }

  componentDidMount() {
    this.loadFireTeam(this.props.eventDetails.id)
  }

  loadFireTeam = (id) => {
    fetch(`http://localhost:3000/user_events/${id}`)
      .then(response => response.json())
      .then(fireTeam => this.setState({ fireTeam }))
  }

  joinFireTeam = (id) => {
    fetch('http://localhost:3000/user_events', {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1,
        event_id: id,
        joined: 'joined'
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(fireTeam => this.setState({ fireTeam: [...this.state.fireTeam, fireTeam]}))
  }

  render() {
    const { activity, description, event_time, helper, id } = this.props.eventDetails
    return (
      <div>
        <Segment 
          color='teal'
          padded
          clearing
        >
          <Header as='h3' color='teal'>
            {destinyEvents[activity]} 
            <Button.Group floated='right'>
              <Button onClick={(e) => this.joinFireTeam(id)}>Join</Button>
              <Button>Alternate</Button>
              <Button>Leave</Button>
            </Button.Group>
            <Header.Subheader>
              {moment(event_time).format('MMMM Do, h:mm a')}
            </Header.Subheader>
          </Header>
          <Divider />
            {description}
            <br /><br />
            
          <FireTeam 
            fireTeam={this.state.fireTeam}
          />

        </Segment>

      </div>
    );
  }
}

export default SegmentEvent;
