import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer tf21B1tEnKDr7DRRJY4EkGA2OlKk';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }