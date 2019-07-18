import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer QkuaYPDA4GglhlFgCs1IOj9uGbjz';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }