module.exports = {
  addLead: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email } = req.body;

    dbInstance.addLead([ company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email ])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
      } );
  },
  getAllLeads: ( req, res, next) => {
    const dbInstance = req.app.get('db');
    const { time_period_start, time_period_end } = req.params;
    dbInstance.getAllLeads([time_period_start, time_period_end])
      .then(leads => res.status(200).send( leads ) )
      .catch( err => {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
      } );
  },
  getLeadsByAm: ( req, res, next) => {
    const dbInstance = req.app.get('db');
    const { time_period_start, time_period_end, am_email } = req.params;
    dbInstance.getLeadsByAm([time_period_start, time_period_end, am_email])
      .then(leadsByAm => res.status(200).send( leadsByAm ) )
      .catch( err => {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
      });
  }
};