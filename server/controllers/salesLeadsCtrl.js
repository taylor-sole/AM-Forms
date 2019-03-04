module.exports = {
    addLeadForSales: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      const { company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep } = req.body;
      dbInstance.addLeadForSales([ company_name, company_phone_number, cardholder_name, contact_name, contact_email, account_number, am_name, am_email, assigned_sales_rep ])
        .then( () => res.sendStatus(200) )
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
          console.log(err)
        } );
    },
    getLeadsForSales: ( req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.getLeadsForSales()
        .then(leads => res.status(200).send( leads ) )
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
          console.log(err)
        });
    },
    getLeadsForSalesByRep: ( req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.getLeadsForSalesByRep([req.params.assigned_sales_rep])
        .then(leads => res.status(200).send( leads ) )
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
          console.log(err)
        });
    },
    deleteLead: (req, res) => {
      const dbInstance = req.app.get('db');
      const {unique_id} = req.params;
      dbInstance.deleteLead([unique_id])
      .then( () => res.sendStatus(200) )
      .catch( err => {
        res.status(500).send({errorMessage: "Oops! Something went wrong. Please let the Product team know."});
        console.log(err)
      } );
    }
  };