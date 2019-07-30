import axios from 'axios';

export function axiosWithAuth (bearer, password, email) {
    const token = `Bearer ${bearer}`;
    const instance = axios.create({
      headers: {
        Authorization: token,
      },
    });
    return instance;
}

export function setApiKeys () {
  const instance = axios.create({
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
    body: {
      "grant_type": 'client_credentials',
      "client_id": 'qeq6JLAhTYLQPnzDuyb7oXvFXYnIjUNz',
      "client_secret": 'FPqLFzv4RcbKVeMN',  
    }
  });
  return instance;
}