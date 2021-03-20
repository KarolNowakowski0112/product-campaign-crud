import React from 'react';

/*
    Account balance component, balance is updated by handleSubmit method in AddCampaign and EditCampaign components
*/

const AccountBalance = (props) => {
    return (
        <div className="account">
            <h2>Account Balance:</h2>
            <div className="balance">
                <h3 className="balance-header">{props.balance}</h3>
            </div>
        </div>
    )
}

export default AccountBalance;
