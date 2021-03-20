import React, {useState} from 'react'
import './App.css';
import campaigns_list from './data.js'
import AddCampaignForm from './forms/AddCampaignForm';
import OnCampaignsTable from './tables/OnCampaignsTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import EditCampaignForm from './forms/EditCampaignForm';
import AccountBalance from './AccountBalance';

function App() {

  const [campaigns, setCampaigns] = useState(campaigns_list);
  // use state to handle account balance component (1 milion by default)
  const [balance, setBalance] = useState(1000000);

  // adds new campaign to campaigns and sets its id 
  const addCampaign = (campaign) => {
    campaign.id = campaigns.length + 1;
    setCampaigns([...campaigns, campaign]);
  };

  // deletes campaign based on its id
  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  // checks if capaign is beign edited
  const [editing, setEditing] = useState(false);
  const initialCampaign = {id: null, name: '', keywords: '', bid_amount: null, campaign_fund: null, status: '', town: '', radius: null};
  const [currentCampaign, setCurrentCampaign] = useState(initialCampaign);

  const editCampaign = (id, campaign) => {
    setEditing(true);
    setCurrentCampaign(campaign);
  }

  // updates edited campaign
  // map used to traverse the list element
  const updateCampaign = (newCampaign) => {
    setCampaigns(
      campaigns.map(campaign => (campaign.id === currentCampaign.id ? newCampaign : campaign)));
      setCurrentCampaign(initialCampaign);
      setEditing(false);
  }

  return (
    <div className="container">
      <div className="title-header">
        <h2>PRODUCTS CAMPAIGNS</h2>
      </div>
      <div className="container account">
        <AccountBalance
          balance={balance} />
      </div>
      <div className="row">
        <div className="seven columns">
        { editing ? (
            <div>
              <h2 className="header-txt">Edit Campaign</h2>
              <EditCampaignForm 
                currentCampaign={currentCampaign}
                currentFund={currentCampaign.campaign_fund}
                setEditing={setEditing}
                updateCampaign={updateCampaign}
                balance={balance}
                setBalance={setBalance}
              />
            </div>
          ) : (
            <div>
              <h2 className="header-txt">Add new Campaign</h2>
              <AddCampaignForm 
                addCampaign={addCampaign}
                balance={balance}
                setBalance={setBalance} />
            </div>
          )}
      </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <h2 className="header-txt">Current Campaigns</h2>
          <OnCampaignsTable 
            campaigns={campaigns}
            deleteCampaign={deleteCampaign}
            editCampaign={editCampaign} />
        </div>
      </div>
    <footer>
      <div id="footer_content" className="container">
        <div className="content has-text-centered">
          <p>
            <strong>©</strong> Karol Nowakowski. Mail to: <a href="mailto:karolnowakowski0112@gmail.com">e-mail address</a>
          </p>
          <p>
            <i id="footer_icon" className="fas fa-code"></i>
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default App;
