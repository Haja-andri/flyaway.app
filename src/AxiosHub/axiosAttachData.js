import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer FK0GkNXuWh9d3V6OANiIKYao8UQP';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }