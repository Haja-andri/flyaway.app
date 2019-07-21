import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 9uGGArFtFVHB3XMA7oqFRehk0UPX';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }