import fs from 'fs';
import { data, user } from './interface'

let data: data = {
  users: []
};

export const getData = () => data;
export const setData = (newData: data) => {
  data = newData;

  const jsonStr = JSON.stringify(newData);
  fs.writeFileSync('./data.json', jsonStr);
}

export const getUsers = () => data.users;
export const addUser = (user: user) => {
  data.users.push(user);
}

export const loadData = () => {
  if (fs.existsSync('./data.json')) {
    const datastore = fs.readFileSync('./data.json');
    data = JSON.parse(String(datastore));
  }
}