import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer JbwOV6Tt9lfqTDrYdwy9tuOXnu7i';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }