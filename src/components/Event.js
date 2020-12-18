import React, { Component } from "react"
import * as moment from "moment"
import { Header, Image, Table } from "semantic-ui-react"

class Event extends Component {
  render() {
    const {
      event_time,
      description,
      activity,
      helper,
    } = this.props.eventDetails

    return (
      <>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="/images/avatar/small/lena.png" rounded size="mini" />
              <Header.Content>
                Raid
                <Header.Subheader>{activity}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {moment(event_time).format("MMMM Do, h:mm a")}
          </Table.Cell>
          <Table.Cell>{description}</Table.Cell>
          <Table.Cell>{helper ? "Helper needed" : "No Helper"}</Table.Cell>
        </Table.Row>
      </>
    )
  }
}

export default Event
