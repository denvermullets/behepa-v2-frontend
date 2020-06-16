import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import queryString from "query-string";

const auth_token = queryString.parse(window.location.search) // puts query params into object // auth_token.code //
const AUTH_URL = `https://www.bungie.net/en/oauth/authorize?client_id=${process.env.REACT_APP_BUNGIE_OAUTH_ID}&response_type=code`
const AUTH_HEADER = `Basic ${process.env.REACT_APP_BUNGIE_SAUCE}`

const PlayerProfile = () => {
  
  useEffect(() => {
    // look to see if url has query params(auth_token), remove it if so
    let uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        let clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
  }, []);

  useEffect(() => {
    // if there's an auth token then let's make the POST req to get our AuthAccessToken
    if (!auth_token) {
      return
    }    

    fetch("https://www.bungie.net/Platform/App/OAuth/Token/", {
      method: 'POST',
      body: `grant_type=authorization_code&code=${auth_token.code}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: AUTH_HEADER,
      },
    })
      // .then(response => response.json())
      .then(response => response.json())
      .then(console.log)

    
  }, []);

  console.log('auth token', auth_token);
  return (
    <>
      <Button onClick={() => window.location = AUTH_URL }>Login w/Bungie</Button>
    </>
  );
}

export default PlayerProfile;
