import axios from 'axios';
import * as config from '../auth_config';

export const userSignUp = function(email, password) {
  return axios.post('https://solefinancial.auth0.com/dbconnections/signup', {
    client_id: config.CLIENTID, email, password, connection: 'Username-Password-Authentication'
  })
  .then(res => {return res.data})
}