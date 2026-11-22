import auth from '../auth/auth-helper';

// link of the server
// on my computer it is empty, online it comes from vercel
const API_URL = process.env.REACT_APP_API_URL || '';

// one function for all requests
// it adds the token if user is signed in
const request = async (url, method = 'GET', body = null) => {
  const headers = { 'Content-Type': 'application/json' };
  const jwt = auth.isAuthenticated();
  if (jwt) {
    headers['Authorization'] = 'Bearer ' + jwt.token;
  }

  const options = { method: method, headers: headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export { API_URL };
export default request;