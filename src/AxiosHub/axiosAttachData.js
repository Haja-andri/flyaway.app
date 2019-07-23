import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 6KPDF2uZv6RWeHzcHLhyddDZVKHG';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }