import axios from 'axios';

export const addLeadForSales = function(company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep) {
  return axios.post('/api/sales-leads', {
    company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep
  })
  .then(res => {return res.data})
  .catch(function (error) {
    alert('There was an error. Please notify your supervisor or the Product team.');
  });
}

export const getLeadsForSales = function() {
  return axios.get(`/api/sales-leads`)
  .then(res => {return res.data})
  .catch(function (error) {
    alert('There was an error. Please notify your supervisor or the Product team.');
  });
}

export const getLeadsForSalesByRep = function(assigned_sales_rep) {
  return axios.get(`/api/sales-leads/${assigned_sales_rep}`)
  .then(res => {return res.data})
  .catch(function (error) {
    alert('There was an error. Please notify your supervisor or the Product team.');
  });
}

export const deleteLead = function(id) {
  return axios.delete(`/api/sales-leads/${id}`, {
  })
  .then(res => {return res.data})
}