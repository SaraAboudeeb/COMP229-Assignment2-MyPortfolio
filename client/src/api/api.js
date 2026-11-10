import auth from '../auth/auth-helper';

// one function for all requests to the server
// it adds the token if the user is signed in
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

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export default request;