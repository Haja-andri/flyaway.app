import axios from 'axios';

export async function axiosWithAuth () {
    // check in the local storage if there is a token
    let bearer = localStorage.getItem('bearer');
    if(!bearer) {
      // get a token first
      bearer = await getTokenSession();
    }
      const token = `Bearer ${bearer}`;
      const instance = axios.create({
        headers: {
          Authorization: token,
        },
      });
      return instance;  
}

export function getTokenSession(){
  const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', 'qeq6JLAhTYLQPnzDuyb7oXvFXYnIjUNz');
    params.append('client_secret', 'FPqLFzv4RcbKVeMN');

  axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params)
  .then((result) => {
    console.log(result.data.access_token);
    debugger
    return result.access_token;
    })
  .catch((err) => {
    console.log('error getting token', err.message);
  });
}