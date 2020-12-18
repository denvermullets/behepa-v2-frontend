import React, { Component } from "react"
import EventForm from "../components/EventForm"
import EventList from "../components/EventList"

class ClanEvent extends Component {
  state = {
    allEvents: [],
  }

  componentDidMount() {
    this.loadAllEvents()
  }

  addNewEvent = (eventInfo) => {
    // get user local timezone
    // let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // let eventTime = moment.tz(`${eventInfo.date} ${eventInfo.time}`, localTimeZone)
    fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify({
        name: "n/a",
        description: eventInfo.description,
        activity: eventInfo.event,
        need_helper: eventInfo.helper,
        event_time: eventInfo.dateTime,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((newEvent) =>
        this.setState({ allEvents: [...this.state.allEvents, newEvent] })
      )
  }

  loadAllEvents = () => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((allEvents) => this.setState({ allEvents }))
  }

  render() {
    // sort by event_time - earliest first
    const sortedState = this.state.allEvents.sort((a, b) =>
      a.event_time > b.event_time ? 1 : -1
    )

    return (
      <>
        <EventForm addNewEvent={this.addNewEvent} />
        <EventList allEvents={sortedState} />
      </>
    )
  }
}

export default ClanEvent
