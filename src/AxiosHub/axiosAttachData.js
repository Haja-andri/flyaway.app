import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer Dmp0x2p5C9t4pzTGyBe96QcFYTrc';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }