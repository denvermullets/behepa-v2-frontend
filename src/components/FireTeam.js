import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react'

class FireTeam extends Component {
  render() {
    return (
      <div>
        <List horizontal>
          <List.Item>
            <Image avatar src='/images/avatar/small/tom.jpg' />
            <List.Content>
              <List.Header>denvermullets</List.Header>
              #123487373
            </List.Content>
          </List.Item>
          <List.Item>
            <Image avatar src='/images/avatar/small/christian.jpg' />
            <List.Content>
              <List.Header>McMew</List.Header>
              #1239847478
            </List.Content>
          </List.Item>
          <List.Item>
            <Image avatar src='/images/avatar/small/matt.jpg' />
            <List.Content>
              <List.Header>Kwaako</List.Header>
              #1237848758
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default FireTeam;
