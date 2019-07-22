import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer rVe4Nuq7oOGuXGG0ZKP643mLrWUh';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }