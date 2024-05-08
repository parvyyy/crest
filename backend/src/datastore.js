import fs from 'fs';

let data = {};

export const getData = () => data;
export const setData = (newData) => {
  data = newData;

  const jsonStr = JSON.stringify(newData);
  fs.writeFileSync('./data.json', jsonStr);
}

export const loadData = () => {
  if (fs.existsSync('./data.json')) {
    const datastore = fs.readFileSync('./data.json');
    data = JSON.parse(String(datastore));
  }
}