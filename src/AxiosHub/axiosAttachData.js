import axios from 'axios';

export function axiosWithAuth () {
    // check in the local storage if there is a token
    return new Promise( (resolve, reject) =>{
      if(localStorage.getItem('bearer')){
        const bearer = localStorage.getItem('bearer');
        const instance = axios.create({
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        resolve(instance);
      }
      else {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', 'qeq6JLAhTYLQPnzDuyb7oXvFXYnIjUNz');
        params.append('client_secret', 'FPqLFzv4RcbKVeMN');
        axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params)
        .then((result) => {
          const token = result.data.access_token;
          const instance = axios.create({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          resolve(instance);
        })
        .catch((err) => {
          reject(err);
        });
      }  
    }
    );
}