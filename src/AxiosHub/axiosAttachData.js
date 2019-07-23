import axios from 'axios';

export function axiosWithAuth (name, password, email) {

    const token = 'Bearer seV2uV2GGU75beFwUmJseCbuFQ83';
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
  }