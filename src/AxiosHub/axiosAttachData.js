import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer t4G0nCFAWkdI7R4NaxZAxf5KvaeV';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }