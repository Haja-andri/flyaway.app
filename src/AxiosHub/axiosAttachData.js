import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer PCA20FxRDJcbaCJva3Au9sliQ9pR';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }