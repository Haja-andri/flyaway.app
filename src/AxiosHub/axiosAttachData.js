import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer Q7WTFulx3gd15JzkMGyvfcX9adot';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }