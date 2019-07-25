import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer LW8faJbmAHacJsOWbifSN5KJqGhe';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }