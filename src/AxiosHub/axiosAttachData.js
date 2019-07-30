import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer CswAts3o1Vgu7L8MPLnJWHQSJQQG';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }