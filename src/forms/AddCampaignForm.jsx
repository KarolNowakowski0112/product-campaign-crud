import React, {useState} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead'
import options_keywords from './keywords'
import options_towns from './towns'
import options_status from './status'

/*
    Form for adding new campaign, renders inputs and typeaheads to type and choose mandatory fields.
*/

const AddCampaignForm = (props) => {

    // initial campaign filled with nulls
    const initCampaign = {id: null, name: '', keywords: '', bid_amount: null, campaign_fund: null, status: '', town: '', radius: null};

    // sets new campaign with given details
    const [campaign, setCampaign] = useState(initCampaign);

    // handles changes of inputs and typeaheads, if type of target is undefined, means that it's typeahead
    // to get the value of typeahead, object is stringyfied and splited
    const handleChange = (e) => {
        if (typeof e.target === 'undefined') {
            let curr = JSON.stringify(e);
            let curr_arr = curr.split('"');
            let val = '';
    
            // concatenates when there are more than just one value
            for (let i = 0; i < ((curr_arr.length - 1) / 4); i++) {
                val = val.concat(curr_arr[i * 4 + 3] + " ");
            }    
    
            setCampaign({...campaign, [e.key]: val});
        } else {
            const {name, value} = e.target;
            setCampaign({...campaign, [name]: value});
        }

    }

    // key is added to determine which field of new campaign is filled
    const handleKeywordsChange = (e) => {
        e.key = "keywords";
        handleChange(e);
    }

    const handleTownChange = (e) => {
        e.key = "town";
        handleChange(e);
    }

    const handleStatusChange = (e) => {
        e.key = "status";
        handleChange(e);
    }

    const handleSubmit = (e) => {

        // prevents disappearing of added campaign
        e.preventDefault();
        // adds new campaign and sets new account balance if all of the mandatory fields are filled
        if (campaign.name && campaign.keywords && campaign.bid_amount && campaign.campaign_fund 
            && campaign.status && campaign.town && campaign.radius) {
           handleChange(e, props.addCampaign(campaign));
           props.setBalance(props.balance - campaign.campaign_fund);
        }
    }

    return (
        <form className="form">
        <div className="seven-columns">
            <label>Name</label>
            <input className="u-full-width" type="text" name="name" value={campaign.name} onChange={handleChange}/>
            <label>Keywords</label>
            <Typeahead clearButton
                multiple
                id="basic-example"
                name="keywords"
                value={campaign.keywords}
                onChange={handleKeywordsChange}
                options={options_keywords}
                placeholder="Choose keywords"
            />
            <label>Bid Amount</label>
            <input className="u-full-width" type="number" name="bid_amount" value={campaign.bid_amount} onChange={handleChange} />
            <label>Campaign Fund</label>
            <input className="u-full-width" type="number" name="campaign_fund" value={campaign.campaign_fund} onChange={handleChange} />
            <label>Status</label>
            <Typeahead clearButton
                id="basic-example"
                name="status"
                value={campaign.status}
                onChange={handleStatusChange}
                options={options_status}
                placeholder="Status (On/Off)"
            />
            <label>Town</label>
            <Typeahead clearButton
                id="basic-example"
                name="town"
                value={campaign.town}
                onChange={handleTownChange}
                options={options_towns}
                placeholder="Choose town"
            />
            <label>Radius</label>
            <input className="u-full-width" type="number" name="radius" value={campaign.radius} onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit}>Add</button>
            </div>
        </form>
    )
}

export default AddCampaignForm;