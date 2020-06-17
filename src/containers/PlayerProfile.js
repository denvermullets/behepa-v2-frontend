import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import queryString from "query-string";

const auth_token = queryString.parse(window.location.search) // puts query params into object // auth_token.code //
const AUTH_URL = `https://www.bungie.net/en/oauth/authorize?client_id=${process.env.REACT_APP_BUNGIE_OAUTH_ID}&response_type=code`
const AUTH_HEADER = `Basic MjkyNzA6Y04tVWdGZVVtMDJnUE9haVFXRmhKUGxoWk5pajFwNUVLVkhoUC1vSnVsQQ==`
const HEADERS = { "content-type": "application/x-www-form-urlencoded",
  Authorization: AUTH_HEADER, }

// a lot of the OAuth logic is based on the code Josh shared, you can find his project here:
// https://github.com/joshhunt/ghost-site

const PlayerProfile = () => {
  const [ bungieAuth, setBungieAuth ] = useState()
  const [ authError, setAuthError ] = useState()

  const updateLocalStorage = (authReturn) => {
    // we need to set the expiration date of the AuthAccessToken and Refresh token before pushing to local storage
    const now = new Date()
    authReturn.accessTokenExpiresDate = new Date().setSeconds(
      now.getSeconds() + authReturn.expires_in )
    authReturn.refreshTokenExpiresDate = new Date().setSeconds(
      now.getSeconds() + authReturn.refresh_expires_in )

    setBungieAuth(authReturn)
    localStorage.setItem("behepa", JSON.stringify(authReturn))
  }
  
  // 1
  // determine if there's some previous user login info
  useEffect(() => {
    // load local storage to see if previously authenticated
    const behepaLocalStorage = JSON.parse(localStorage.getItem("behepa" || "{}"))
    
    if (!behepaLocalStorage.access_token) {
      // if no access_token found in localStorage skip to next useEffect
      return
    }
    
    // we're going to check to see if any of our previous auths have expired
    behepaLocalStorage.accessTokenExpiresDate = new Date(
      behepaLocalStorage.accessTokenExpiresDate )
    behepaLocalStorage.refreshTokenExpiresDate = new Date(
      behepaLocalStorage.refreshTokenExpiresDate )
        
    const now = new Date()
    if (behepaLocalStorage.accessTokenExpiresDate > now) {
      // auth isn't expired yet, set to state and gtfo
      setBungieAuth(behepaLocalStorage)
      return
    }

    if (behepaLocalStorage.refreshTokenExpiresDate > now) {
      // it's busted son, lemme get at dat new new
      // aka we're going to refresh the auth
      fetch("https://www.bungie.net/Platform/App/OAuth/Token/", {
        method: 'POST',
        body: `grant_type=refresh_token&refresh_token=${behepaLocalStorage.refresh_token}`,
        headers: HEADERS, })
          .then(response => response.json())
          .then(authReturn => {
            if (authReturn.access_token) {
              updateLocalStorage(authReturn)
            } else if (authReturn.error_description) {
              setAuthError(authReturn.error_description)
            }
          })
    }
    
  }, [])

  // 2
  // usually going to be updated on redirect from Bungie auth
  useEffect(() => {
    // if there's an auth token then let's make the POST req to get our AuthAccessToken
    if (!auth_token.code) {
      return
    }    

    fetch("https://www.bungie.net/Platform/App/OAuth/Token/", {
      method: 'POST',
      body: `grant_type=authorization_code&code=${auth_token.code}`,
      headers: HEADERS,
    })
      .then(response => response.json())
      .then(authReturn => {
        if (authReturn.access_token) {          
          updateLocalStorage(authReturn)
        } else if (authReturn.error_description) {
          setAuthError(authReturn.error_description)
        }
      })
    // remove auth_token code from url
    let uri = window.location.toString()
    if (uri.indexOf("?") > 0) {
      let clean_uri = uri.substring(0, uri.indexOf("?"))
      window.history.replaceState({}, document.title, clean_uri)
    }

  }, [])

  
  return (
    <>
      <Button onClick={() => window.location = AUTH_URL }>Login w/Bungie</Button>
    </>
  );
}

export default PlayerProfile
