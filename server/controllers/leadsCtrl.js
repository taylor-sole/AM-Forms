module.exports = {
  addLead: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email } = req.body;

    dbInstance.addLead([ company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email ])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
        console.log(err)
      } );

  }
};