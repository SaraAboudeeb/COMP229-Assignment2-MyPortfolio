import auth from './auth-helper';

// clear the storage before each test
beforeEach(() => {
  localStorage.clear();
});

test('user is not signed in at first', () => {
  expect(auth.isAuthenticated()).toBe(false);
});

test('sign in saves the token and user', () => {
  auth.authenticate({ token: 'abc123', user: { name: 'Sara', role: 'user' } });
  const data = auth.isAuthenticated();
  expect(data.token).toBe('abc123');
  expect(data.user.name).toBe('Sara');
});

test('isAdmin works only for admin', () => {
  auth.authenticate({ token: 'abc', user: { role: 'user' } });
  expect(auth.isAdmin()).toBe(false);

  auth.authenticate({ token: 'abc', user: { role: 'admin' } });
  expect(auth.isAdmin()).toBe(true);
});

test('sign out removes the token', async () => {
  // fake fetch, so we do not call the real server
  global.fetch = jest.fn(() => Promise.resolve({}));
  auth.authenticate({ token: 'abc', user: { role: 'user' } });
  await auth.signout();
  expect(auth.isAuthenticated()).toBe(false);
});