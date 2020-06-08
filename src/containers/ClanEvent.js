import React, { Component } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import * as moment from "moment-timezone" 


class ClanEvent extends Component {

    state = {
        allEvents: [],
    }

    componentDidMount() {
        this.loadAllEvents()
    }

    addNewEvent = (eventInfo) => {
        // get user local timezone
        // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
        let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        let eventTime = moment.tz(`${eventInfo.date} ${eventInfo.time}`, localTimeZone)


        fetch('http://localhost:3000/events', {
            method: 'POST',
            body: JSON.stringify({
                name: 'n/a',
                description: eventInfo.description,
                activity: eventInfo.event,
                need_helper: eventInfo.helper,
                event_day: eventInfo.date,
                event_time: eventTime.format()
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }})
                .then(response => response.json())
                .then(newEvent => this.setState({ allEvents: [...this.state.allEvents, newEvent]}))
    }

    loadAllEvents = () => {
        fetch('http://localhost:3000/events')
            .then(response => response.json())
            .then(allEvents => this.setState({ allEvents }))
    }

    render() {
        return (
            <>
                <EventForm 
                    addNewEvent={this.addNewEvent}
                />
                <EventList
                    allEvents={this.state.allEvents}
                />
            </>
        );
    }
}

export default ClanEvent;