module.exports = {
    addLeadForSales: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      const { company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep } = req.body;
      dbInstance.addLeadForSales([ company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep ])
        .then( () => res.sendStatus(200) )
        .catch( err => {
          res.status(500).send({errorMessage: err});
        } );
    },
    getLeadsForSales: ( req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.getLeadsForSales()
        .then(leads => res.status(200).send( leads ) )
        .catch( err => {
          res.status(500).send({errorMessage: err});
        });
    },
    getLeadsForSalesByRep: ( req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.getLeadsForSalesByRep([req.params.assigned_sales_rep])
        .then(leads => res.status(200).send( leads ) )
        .catch( err => {
          res.status(500).send({errorMessage: err});
        });
    },
    deleteLead: (req, res) => {
      const dbInstance = req.app.get('db');
      const {id} = req.params;
      dbInstance.deleteLead([id])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send({errorMessage: err});
      } );
    }
  };