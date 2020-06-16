import React from 'react';
import { Button } from 'semantic-ui-react'

const AUTH_URL = `https://www.bungie.net/en/oauth/authorize?client_id=${process.env.REACT_APP_BUNGIE_OAUTH_ID}&response_type=code`


const SearchPlayer = () => {
 
  return (
    <>
      {/* <Button onClick={getAuthCode}>Click Here</Button> */}
      <Button onClick={() => window.location = AUTH_URL }>Login w/Bungie</Button>
    </>
  );
}

export default SearchPlayer;
