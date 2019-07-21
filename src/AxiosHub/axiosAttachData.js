import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer ScWfXjJiELCmMesAGhSnfbRvLOZv';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }