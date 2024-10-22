import { useQuery } from '@apollo/client';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { GET_ROLES } from '../../../lib/GraphQl/Queries';

export default function Tags({ role, setRole, setIsCustomer, setIsDelivery }) {
    const [disable, setDisable] = React.useState(false);
    const rolesData = useQuery(GET_ROLES, { fetchPolicy: "no-cache" });

    if (rolesData.loading) return <div className='text-center'>Loading...</div>;
    if (rolesData.error) return <div className='text-center'>Error</div>;

    function handleChange(value) {

        const customerVal = value.some((val) => val?.code === 'CSTMR');
        const deliveryVal = value.some((val) => val?.code === 'DLVRY');

        setDisable(customerVal || deliveryVal);

        setIsCustomer(customerVal);
        setIsDelivery(deliveryVal);
        setRole(value);

    }

    return (
        <Stack spacing={3} sx={{ width: "100%" }}>
            <Autocomplete
                multiple
                getOptionDisabled={(option) => disable && option.code !== 'CSTMR' || disable && option.code !== 'DLVRY'}
                onChange={(event, value) => handleChange(value)}
                id="roles"
                options={rolesData.data?.listRolesDropdown || []}
                getOptionLabel={(role) => role.name}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        name='role'
                        {...params}
                        label="Roles"
                        placeholder="Roles"
                    />
                )}
            />
        </Stack>
    );
}
