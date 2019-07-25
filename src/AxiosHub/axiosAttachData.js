import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer ATGrB1Td394i8iF4whMxSFZbGQm4';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }