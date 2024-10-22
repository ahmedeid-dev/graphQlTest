/* eslint-disable react/prop-types */
import { Delete as DeleteIcon, Edit as EditIcon, Launch as LaunchIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
export default function DataTable({ result }) {
    const navigate = useNavigate()
    function handleClick() {
        navigate("/users/add")
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'User Name', width: 130 },
        { field: '__typename', headerName: 'Type', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 230,
            renderCell: (params) => (
                <>
                    {/* <IconButton
                        color="primary"
                        onClick={() => handleEdit(params.row.id)}
                    >
                        <EditIcon />
                    </IconButton> */}
                    {/* <IconButton
                        color="secondary"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton> */}

                    <IconButton
                        color="success"
                        onClick={() => handleLaunch(params.row.id)}
                    >
                        <LaunchIcon />
                    </IconButton>
                </>
            ),
            sortable: false,
        }, {
            field: 'add',
            headerName: <button onClick={() => { handleClick() }} className="bg-blue-500 flex w-full hover:bg-blue-700 text-white font-bold py-2 px-10 my-2 rounded">
                Add
            </button>,
            width: 230,
            sortable: false,
        },
    ];

    // const handleEdit = (id) => {
    //     console.log(`Edit item with ID: ${id}`);
    // };

    // const handleDelete = (id) => {
    //     console.log(`Delete item with ID: ${id}`);
    // };
    const handleLaunch = (id) => {
        navigate(`/users/show/${id}`);
    };

    const rows = result?.map(({ id, username, __typename }) => ({ id, username, __typename })) || [];

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Paper sx={{ height: 400, width: "auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
