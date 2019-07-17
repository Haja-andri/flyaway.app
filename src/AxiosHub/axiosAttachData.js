import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer LXZH70XBTMkGkVsD5YQnfabjMp8k';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }