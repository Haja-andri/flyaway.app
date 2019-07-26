import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer ghprsKGSVjCcOUlhOzZO2Bp4SgAP';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }