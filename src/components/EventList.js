import React, { Component } from "react"
import { Segment } from "semantic-ui-react"
import SegmentEvent from "./SegmentEvent"

class EventList extends Component {
  formatTime = (itemTime) => {
    // let date = new Date(itemTime);
    // return date.toString();
    let options = { hour: "numeric", minute: "2-digit" }
    let dateTime = new Date(itemTime)
    let justTime = dateTime.toLocaleTimeString(undefined, options)
    return justTime
  }
  // moment().format("MMM Do YY")

  render() {
    return (
      <>
        <br />
        <Segment.Group>
          {this.props.allEvents.map((singleEvent) => (
            <SegmentEvent key={singleEvent.id} eventDetails={singleEvent} />
          ))}
        </Segment.Group>
      </>
    )
  }
}

export default EventList
