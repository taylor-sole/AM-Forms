import axios from 'axios';

export const addLead = function(company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email) {
  return axios.post('/api/leads', {
    company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email
  })
  .then(res => {return res.data})
}

export const getLeads = function(){
  console.log('getLeads'
)}