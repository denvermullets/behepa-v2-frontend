import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react'
import FireTeam from './FireTeam'

class Alternate extends Component {
  render() {
    return (
      <>
      <Header as='h4' color='orange'>Fireteam:</Header>
          <List horizontal verticalAlign='middle'>
            {this.props.alternate.map(guardian => <FireTeam 
              key={guardian.id}
              guardian={guardian}
            />)}
      </List>
      </>
    );
  }
}

export default Alternate;
