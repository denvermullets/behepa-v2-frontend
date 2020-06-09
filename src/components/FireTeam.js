import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react'

class FireTeam extends Component {

  state = {
    player: '',
    avatar: '',
  }

  componentDidMount() {
    this.loadPlayerDetails()
    this.getPlayerAvatar()
  }
  
  loadPlayerDetails = () => {
    fetch(`http://localhost:3000/users/${this.props.guardian.user_id}`)
      .then(response => response.json())
      .then(player => this.setState({ player: player}))
  }

  getPlayerAvatar = () => {
    fetch(`https://www.bungie.net/Platform//User/GetBungieNetUserById/${this.state.player.bungie_id}/`)
      .then(response => response.json())
      .then(newAvatar => this.setState({ avatar: newAvatar.Response.profilePicturePath}))
  }

  render() {
    return (

        
          <List.Item>
            <Image avatar src={`https://www.bungie.net${this.state.player.avatar}`} />
            <List.Content>
              <List.Header> {this.state.player.display_name} </List.Header>
              {/* {this.state.player.membership_id} */}
            </List.Content>
          </List.Item>
          
    );
  }
}

export default FireTeam;
