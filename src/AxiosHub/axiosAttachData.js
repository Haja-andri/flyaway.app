import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer oAdUcwDZOKC8VUOfpdZxDEYAy27t';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }