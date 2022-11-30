import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const columns = [
    { field: 'id', headerName: 'ID', width: 70, editable: false },
    { field: 'firstname', headerName: 'First name', width: 130, editable: true },
    { field: 'lastname', headerName: 'Last name', width: 130, editable: true },
    {
        field: 'fullName', headerName: 'Full name', width: 160,
        valueGetter: (params) =>
            `${params.row.firstname || ''} ${params.row.lastname || ''}`,
    },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 70, editable: true },
    { field: 'country', headerName: 'Country', width: 140, editable: true },
    {
        field: '', headerName: 'Active', editable: true, width: 100,
        renderCell: (params) => (
            <Select
                value={params.row.active}
                label="Age"
                onChange={(e) => {
                    params.row.active = e.target.value
                }}
            >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>                
            </Select>
        )
    }
];

export const inputs = [
    { id: 1, label: 'First Name', type: 'text', name: 'firstname' },
    { id: 2, label: 'Last name', type: 'text', name: 'lastname' },
    { id: 3, label: 'Age', type: 'number', name: 'age' },
    { id: 4, label: 'Country', type: 'text', name: 'country' },
    { id: 5, label: 'Email', type: 'text', name: 'email' },
    { id: 6, label: 'Phone', type: 'number', name: 'phone' }
]