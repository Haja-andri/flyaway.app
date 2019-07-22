import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer HjkX4zy6iTotyiTMr2B19XQRJGAX';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }