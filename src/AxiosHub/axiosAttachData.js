import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer 8hGc2kBQ4BeqwyKprlDZlZCK9W3Z';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }