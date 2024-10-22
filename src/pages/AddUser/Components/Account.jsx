import { useQuery } from '@apollo/client';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { GET_AGENTS, GET_CUSTOMERS } from '../../../lib/GraphQl/Queries';

export default function Account({ options, customer, setData, option }) {
    const customerData = useQuery(GET_CUSTOMERS, { fetchPolicy: "no-cache" });
    const agentData = useQuery(GET_AGENTS, { fetchPolicy: "no-cache" });
    if (customerData.loading || agentData.loading) return <div>Loading...</div>;
    if (customerData.error || agentData.error) return <div>Error</div>;
    function setAccount(value) {
        setData(value?.code);
    }
    return (
        <Stack spacing={3} sx={{ width: "100%" }} >
            <Autocomplete
                disabled={option == null}
                onChange={(event, value) => setAccount(value)}
                options={option === "isCustomer" ? customerData.data?.listCustomersDropdown : option === "isDelivery" ? agentData.data?.listDeliveryAgentsDropdown : []}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        name='account'
                        {...params}
                        label={option === "isCustomer" ? "Customer" : option === "isDelivery" ? "Delivery Agent" : "Account"}
                        placeholder="account"
                    />
                )}
            />
        </Stack>
    );
}