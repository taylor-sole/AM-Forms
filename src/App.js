import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="am-page-wrapper">
          <div className="am-page-form">
          <div className="am-selection-wrapper">
            <div className="am-selection-style-layer">
              <select>
                <option selected disabled>Account Manager Name</option>
                <option>Alex Martinez</option>
                <option>Alysha Gonzales</option>
                <option>Ana Lucy Galeana</option>
                <option>Antonio Hopper</option>
                <option>Anyssa Guzman</option>
                <option>Chenoa Swanson</option>
                <option>Dana Martinez</option>
                <option>Dion Nizzi</option>
                <option>Erick Martinez</option>
                <option>Jazz Sullivan</option>
                <option>Jehan Hasan</option>
                <option>Joyce Hughes</option>
                <option>Luis Tepetlapa</option>
                <option>Melissa Horstman</option>
                <option>Melody Eastburn</option>
                <option>Mylz Hernandez</option>
                <option>Noah Curwick</option>
                <option>Rachel Garcia</option>
                <option>Seamus Campbell</option>
                <option>Theo Cobb</option>
                <option>Yessica Galeana</option>
              </select>
            </div>
          </div>
          <span className="am-page-form-title">Marketing Emails</span>
          <form action="https://go.pardot.com/l/323461/2019-02-12/h87d3" method="post">
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" />
                  <p>Swipe Smarter</p>
                </div>
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" />
                  <p>Survey</p>
                </div>
                <div className="text-input-wrapper">
                  <p>Cardholder First Name</p>
                  <input required name="cardholder_name" />
                </div>
              </div>
              <div className="am-page-form-column column-2">
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" />
                  <p>Tax Refund</p>
                </div>
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" />
                  <p>Mobile App</p>
                </div>
                <div className="text-input-wrapper">
                  <p>Cardholder Email</p>
                  <input required name="cardholder_email" />
                </div>
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            <button className="am-page-form-submit-button" type="submit">Send</button>
            </div>
          </form> 
        </div>
        <div className="am-page-form">
          <span className="am-page-form-title">2nd Job Lead</span>
          <form action="http://www2.solepaycard.com/l/323461/2019-02-08/h6c8k" method="post">
            <div className="am-page-form-column-wrapper">
              <div className="am-page-form-column column-1">
                <div className="text-input-wrapper">
                  <p>Company Name</p>
                  <input required name="company_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Business Phone Number</p>
                  <input required name="business_phone_number" />
                </div>
                <div className="text-input-wrapper">
                  <p>Referring Cardholder Name</p>
                  <input required name="referring_cardholder_name" />
                </div>
              </div>
              <div className="am-page-form-column column-2">
                <div className="text-input-wrapper">
                  <p>Contact Name (optional)</p>
                  <input name="contact_name" />
                </div>
                <div className="text-input-wrapper">
                  <p>Contact Email (optional)</p>
                  <input name="contact_email" />
                </div>
                <div className="text-input-wrapper">
                  <p>Last 4 of CH Acct #</p>
                  <input required name="cardholder_account_number" />
                </div>
              </div>
            </div>
            <div className="am-page-form-submit-button-wrapper">
            <button className="am-page-form-submit-button" type="submit">Submit</button>
            </div>
          </form> 
        </div>
        </div>
      </div>
    );
  }
}

export default App;
