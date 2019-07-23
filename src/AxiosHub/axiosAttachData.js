import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 6jhOzxAYNqjkeAAu0GGaeDtXGqgf';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }