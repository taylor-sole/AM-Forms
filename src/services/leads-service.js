import axios from 'axios';

export const addLead = function(company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email) {
  return axios.post('/api/leads', {
    company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email
  })
  .then(res => {return res.data})
  .catch(function (error) {
    console.log(error);
    alert('There was an error. Please notify your supervisor or the Product team.');
  });
}

export const getAllLeads = function(time_period_start, time_period_end) {
  return axios.get(`/api/leads/${time_period_start}/${time_period_end}`)
  .then(res => {return res.data})
  .catch(function (error) {
    console.log(error);
    alert('There was an error. Please notify your supervisor or the Product team.');
  });
}