import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

//  Checks for access token - subject to change
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    .then((res) => res.json())
    .catch((error) => error.json());
  return result;
}

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://u44bq09nx2.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
    .then((res) => {
      return res.json()
    })
    .catch((error) => error);
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
}


export const getEvents = async () => {
  NProgress.start()

  // !navigator.onLine checks whether the user is offline, but this only works if there’s no internet
  
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(events).events : [];
  }

  if (window.location.href.startsWith('http://localhost' || 'https://localhost')) {
    // load progress bar finished executed
    NProgress.done()
    return mockData;
  }

  const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
      const newurl = window.location.protocol + "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      const newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }

  }
}
const token = await getAccessToken();
if (token) {
  removeQuery();
  const url = 'https://u44bq09nx2.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
  const result = await axios.get(url);
  if (result.data) {
    let locations = extractLocations(result.data.events);
    localStorage.setItem('lastEvents', JSON.stringify(result.data));
    localStorage.setItem('locations', JSON.stringify(locations));
  }
  NProgress.done();
  return result.data.events;
}
}

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));;

  // if no token or if there is token error and no auth code then redirect us to the google auth screen
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParameter = new URLSearchParams(window.location.search);
    const code = await searchParameter.get('code');

    if (!code) {
      const results = await axios.get("https://u44bq09nx2.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken
}

// takes accessToken and checks whether it's valid  or o


