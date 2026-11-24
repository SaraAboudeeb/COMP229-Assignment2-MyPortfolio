import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';

// we only test the form, so we use a fake Link
jest.mock('react-router-dom', () => ({
  Link: (props) => props.children
}));

test('sign up form is on the page', () => {
  render(<Signup />);
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
});

test('show error if the form is empty', () => {
  render(<Signup />);
  fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
});

test('show error if the password is short', () => {
  render(<Signup />);
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Sara' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'sara@test.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password (at least 6 characters)'), { target: { value: '123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
});