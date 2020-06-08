import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class Navbar extends Component {
  state = { 
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state
    
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link} to="/"
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to="/events"
            name='events'
            active={activeItem === 'events'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='roster'
            active={activeItem === 'roster'}
            onClick={this.handleItemClick}
            as={Link} to="/roster"
          />
          <Menu.Item
            name='leaderboards'
            active={activeItem === 'leaderboards'}
            onClick={this.handleItemClick}
            as={Link} to="/leaderboards"
          />
          {/* <Menu.Menu position='right'>
            <Menu.Item
              as={NavLink} to="/roster"
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu> */}
        </Menu>
      </div>
    );
  }
}

export default Navbar;