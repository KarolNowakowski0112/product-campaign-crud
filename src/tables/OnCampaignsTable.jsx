import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

/*
    Table component responsible for showing the table of all campaigns.
    Responsiveness is guaranteed by react-super-responsive-table.
*/

const OnCampaignsTable = (props) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Keywords</Th>
                    <Th>Bid Amount</Th>
                    <Th>Campaign Fund</Th>
                    <Th>Status</Th>
                    <Th>Town (+ Radius km)</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                </Tr>
            </Thead>
            <Tbody>
                { props.campaigns.length > 0 ? (
                    props.campaigns.map(campaign => {
                        const {id, name, keywords, bid_amount, campaign_fund, status, town, radius} = campaign;
                        return (
                            <>
                            <Tr className="campaigns-table">
                                <Td>{id}</Td>
                                <Td>{name}</Td>
                                <Td>{keywords}</Td>
                                <Td>{bid_amount}</Td>
                                <Td>{campaign_fund}</Td>
                                <Td>{status}</Td>
                                <Td>{town} ({radius} km)</Td>
                                <Td className="changes-buttons">
                                    <button className="edit-button" onClick={() => props.editCampaign(id, campaign)}>Edit</button>
                                </Td>
                                <Td className="changes-buttons">
                                    <button className="delete-button" onClick={() => props.deleteCampaign(id)}>Delete</button>
                                </Td>
                            </Tr>
                            </>
                        )
                    })
                ) : (
                    <Tr>
                        <Td colSpan={4}>No campaigns found</Td>
                    </Tr>
                )   
                }
            </Tbody>
        </Table>

    )
}

export default OnCampaignsTable;