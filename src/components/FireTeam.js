import React, { useState, useEffect } from 'react';
import { Image, List } from 'semantic-ui-react'

// we should be gettin a single ${guardian} passed down
// using guardian.id we can ping our own api to look up the guardian info

// postman generated code ;(
let myHeaders = new Headers();
myHeaders.append("X-API-Key", `${process.env.REACT_APP_BUNGIE_API_KEY}`);

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

  const FireTeam = (props) => {
    // set initial state w/hook and set callback function for updating
    const [player, setPlayer] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [playerInfoLoaded, setPlayerInfoLoaded] = useState(false)
    const [urlLoaded, setUrlLoaded] = useState(false)

    // so, we have checks to prevent getting 404 errors when pinging bungie's site
    // 1 - get fireTeam member info from our API
    // 2 - use that info once saved to useState (pain in the ass)
    // 3 - make sure that all checks are true before pinging bungie's site or trying to load
    // 4 - get janky image loading. but it works. ridic.

    useEffect(() => {
      fetch(`http://localhost:3000/users/${props.guardian.user_id}`)
        .then(response => response.json())
        .then(player => setPlayer(player))
        .then(setPlayerInfoLoaded(true))
    }, [])

    useEffect(() => {
      if (playerInfoLoaded) {
        fetch(`https://www.bungie.net/Platform/User/GetBungieNetUserById/${player.bungie_id}/`, requestOptions)
        .then(response => response.json())
        .then(avatarUrl => setAvatarUrl(avatarUrl.Response.profilePicturePath))
      }
      setUrlLoaded(true)
    }, [player])

  return (
       <List.Item>
         {urlLoaded ? <Image avatar src={`https://bungie.net${avatarUrl}`} /> : null }
       <List.Content>
         {/* since async, let's check if the value exists, display nothing if fetch isn't done yet */}
         <List.Header>{player ? player.display_name : "" }</List.Header>
         {/* {this.state.player.membership_id}  DISPLAY STEAM ID */}
         #123456789
       </List.Content>
     </List.Item>

  );
}

export default FireTeam;
