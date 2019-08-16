import axios from 'axios';

export function axiosWithAuth () {
    // check in the local storage if there is a token
    return new Promise( (resolve, reject) =>{
      const bearer = localStorage.getItem('bearer');
      const bearerTimeStamp = localStorage.getItem('bearer-time-stamp');
      const tokenLifespan = localStorage.getItem('token_lifespan');
      // if there is a token stored locally && it is still valid
      const expiryTime = parseInt(bearerTimeStamp) + parseInt(tokenLifespan);
      if(bearer && expiryTime > Date.now()){
        const instance = axios.create({
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        resolve(instance);
      }
      else {
        const params = new URLSearchParams();
        params.append('grant_type', process.env.REACT_APP_AMA_GRANT_TYPE);
        params.append('client_id', process.env.REACT_APP_AMA_CLIENT_ID_PROD);
        params.append('client_secret', process.env.REACT_APP_AMA_CLIENT_SECRET_PROD);
        axios.post('https://api.amadeus.com/v1/security/oauth2/token', params)
        .then((result) => {
          const token = result.data.access_token;
          const token_lifespan = result.data.expires_in;
          const instance = axios.create({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem('bearer', token);
          localStorage.setItem('bearer-time-stamp', Date.now());
          localStorage.setItem('token_lifespan', token_lifespan * 1000);
          resolve(instance);
        })
        .catch((err) => {
          reject(err);
        });
      }  
    }
    );
}