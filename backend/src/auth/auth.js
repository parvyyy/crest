import isEmail from 'validator/es/lib/isEmail';
import { v4 as uuidv4 } from 'uuid';
import HTTPError from 'http-errors';
import { getUsers, getData, setData } from '../datastore';

export const authRegister = (email, name, password) => {
  if (!isEmail(email)) {
    throw HTTPError(400, 'The email entered is invalid.')
  }

  if (!isAvailableEmail(email)) {
    throw HTTPError(400, 'The email entered is already used. Please sign in.')
  }

  if (!isValidPassword()) {
    throw HTTPError(400, 'Password must be between 6-50 characters.')
  }

  const data = getData();
  const user = {
    userId: uuidv4(),
    token: uuidv4(),
    email,
    name,
    password,
  }
  data.users.push(user);

  setData(data);

  return {
    userId: user.userId,
    token: user.token
  }
}

const isValidPassword = (pass) => pass.length > 6 && pass.length < 50;

const isAvailableEmail = (email) => {
  const users = getUsers();
  return users.includes(u => u.email === email);
}