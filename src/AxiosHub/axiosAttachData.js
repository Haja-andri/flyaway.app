import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 8x0J5WmGtjkywQ6cV7TO8aTCYYne';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }