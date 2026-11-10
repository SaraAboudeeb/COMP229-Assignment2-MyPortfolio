// save the token and user after sign in
const authenticate = (data) => {
  localStorage.setItem('jwt', JSON.stringify(data));
};

// get the token and user if signed in
const isAuthenticated = () => {
  const data = localStorage.getItem('jwt');
  if (!data) return false;
  return JSON.parse(data);
};

// check if the user is admin
const isAdmin = () => {
  const data = isAuthenticated();
  return data && data.user && data.user.role === 'admin';
};

// sign out - remove the token
const signout = async () => {
  localStorage.removeItem('jwt');
  try {
    await fetch('/auth/signout');
  } catch (err) {
    console.log(err);
  }
};

const auth = { authenticate, isAuthenticated, isAdmin, signout };

export default auth;