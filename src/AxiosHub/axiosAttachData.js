import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer ogDbKqGfYkrsBnAdk8FG8JkCXVjQ';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }