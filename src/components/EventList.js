import React, { Component } from 'react';
import * as moment from "moment" 
import { Table } from 'semantic-ui-react'
import Event from '../components/Event';


class EventList extends Component {

  formatTime = (itemTime) => {
    // let date = new Date(itemTime);
    // return date.toString();
    let options = { hour: 'numeric', minute: '2-digit' };
    let dateTime = new Date(itemTime)
    let justTime = dateTime.toLocaleTimeString(undefined, options);
    return justTime
  }
  // moment().format("MMM Do YY")

  render() {
    
    return (
      <>
        <Table 
          basic='very' celled collapsing
          selectable={true}
          sortable={true}
        >

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Event</Table.HeaderCell>
              <Table.HeaderCell>When</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Helper Needed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.allEvents.map(singleEvent => <Event 
              key={singleEvent.id}
              eventDetails={singleEvent}
            />)}

          </Table.Body>
        </Table>
      </>
    );
  }
}

export default EventList;