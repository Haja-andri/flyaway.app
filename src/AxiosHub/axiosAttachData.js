import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 21zTH8UA4Lid5nqMRV5pb5D6mGnt';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }