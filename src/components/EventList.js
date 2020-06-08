import React, { Component } from 'react';
import * as moment from "moment" 
import { Table } from 'semantic-ui-react'


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
       Event_list
      </>
    );
  }
}

export default EventList;