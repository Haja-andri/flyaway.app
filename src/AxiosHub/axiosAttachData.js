import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer oxfbCiH9pG9lyI78O9XtCsu0cbpO';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }