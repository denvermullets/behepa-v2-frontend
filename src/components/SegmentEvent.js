import React, { Component } from 'react';
import * as moment from "moment" 
import { Segment, Header, Divider, Button, List } from 'semantic-ui-react'
import FireTeam from './FireTeam';
import Alternate from './Alternate'

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
    alternate: [],
  }

  componentDidMount() {
    this.loadFireTeam(this.props.eventDetails.id)
  }

  loadFireTeam = (id) => {
    fetch(`http://localhost:3000/user_events/${id}`)
      .then(response => response.json())
      .then(fireTeam => this.setState({ fireTeam }))
  }

  joinFireTeam = (id, isAlternate) => {
    fetch('http://localhost:3000/user_events', {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1,
        event_id: id,
        alternate: isAlternate
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())  
      .then(newGuardian => this.addToTeam(newGuardian, isAlternate))
      // .then(fireTeam => this.setState({ fireTeam: [...this.state.fireTeam, fireTeam]}))
  }

  addToTeam = (newGuardian, alternate) => {
    if (alternate) {
      this.setState({ alternate: [...this.state.alternate, newGuardian]})
    } else {
      this.setState({ fireTeam: [...this.state.fireTeam, newGuardian]})
    }
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
              <Button onClick={(e) => this.joinFireTeam(id, false)}>Join</Button>
              <Button onClick={(e) => this.joinFireTeam(id, true)}>Alternate</Button>
              <Button>Leave</Button>
            </Button.Group>
            <Header.Subheader>
              {moment(event_time).format('MMMM Do, h:mm a')}
            </Header.Subheader>
          </Header>
          <Divider />
            {description}
          {this.state.fireTeam.length > 0 ? <Header as='h4' color='green'>Fireteam:</Header> : null }
          <List horizontal verticalAlign='middle'>
            {this.state.fireTeam.map(guardian => <FireTeam 
              key={guardian.id}
              guardian={guardian}
            />)}
          </List>
          {this.state.alternate.length > 0 ? 
          <Alternate alternate={this.state.alternate} /> : null }
        </Segment>

      </div>
    );
  }
}

export default SegmentEvent;
