import React, { Component } from "react"
import * as moment from "moment"
import { Segment, Header, Divider, Button, List, Icon } from "semantic-ui-react"
import FireTeam from "./FireTeam"
import Alternate from "./Alternate"

// events are about to be removed with d2 expansion beyond light - update list
const destinyEvents = {
  levi: "Leviathan",
  eow: "Leviathan, Eater of Worlds",
  sos: "Leviathan, Spire of Stars",
  lw: "Last Wish",
  sotp: "Scourge of the Past",
  cos: "Crown of Sorrow",
  gos: "Garden of Salvation",
  nf: "Nightfall",
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
      .then((response) => response.json())
      .then((fireTeam) => this.setState({ fireTeam }))
  }

  joinFireTeam = (id, isAlternate) => {
    fetch("http://localhost:3000/user_events", {
      method: "POST",
      body: JSON.stringify({
        user_id: 1,
        event_id: id,
        alternate: isAlternate,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((fireTeam) =>
        this.setState({ fireTeam: [...this.state.fireTeam, fireTeam] })
      )
  }

  render() {
    const {
      activity,
      description,
      event_time,
      helper,
      id,
    } = this.props.eventDetails

    let fireTeamAlternates = this.state.fireTeam.filter((isAlternate) => {
      return isAlternate.alternate === true
    })

    let fireTeamMain = this.state.fireTeam.filter((alternate) => {
      return alternate.alternate === false
    })

    return (
      <div>
        <Segment color="teal" padded clearing>
          <Header as="h3" color="teal">
            {destinyEvents[activity]}
            <Button.Group floated="right">
              <Button onClick={(e) => this.joinFireTeam(id, false)}>
                Join
              </Button>
              <Button onClick={(e) => this.joinFireTeam(id, true)}>
                Alternate
              </Button>
              <Button>Leave</Button>
            </Button.Group>
            <Header.Subheader>
              {moment(event_time).format("MMMM Do, h:mm a")}
            </Header.Subheader>
          </Header>
          <Divider />
          {description}
          {fireTeamMain.length > 0 ? (
            <Header as="h4" color="green">
              Fireteam:
            </Header>
          ) : null}
          <List horizontal verticalAlign="middle">
            {fireTeamMain.map((guardian) => (
              <FireTeam key={guardian.id} guardian={guardian} />
            ))}
          </List>
          {fireTeamAlternates.length > 0 ? (
            <Alternate alternate={fireTeamAlternates} />
          ) : null}
        </Segment>
      </div>
    )
  }
}

export default SegmentEvent
