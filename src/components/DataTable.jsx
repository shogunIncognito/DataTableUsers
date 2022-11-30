import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from '../api/api';
import UserAddButton from "./UserAddButton";
import DeleteButton from "./DeleteButton";
import Spinner from './Spinner'
import { getUsers } from "../api/api";
import { AlertContext } from "../context/AlertContext";
import { columns } from "../helper/tableInputs";
import Container from '@mui/material/Container'
import { DataGrid } from '@mui/x-data-grid/';
import Button from "@mui/material/Button";


export default function DataTable() {
    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [rows, setRows] = useState([]);
    const [camps, setCamps] = useState([]);
    const { setAlert, setValues } = useContext(AlertContext)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            setAlert(true)
            setValues({ type: 'success', message: 'User updated' })
            queryClient.invalidateQueries('users')
        },
        onError: (error) => {
            console.log(error)
            setAlert(true)
            setValues({ type: 'error', message: 'Error updating note' })
        }
    })

    const { data: users, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })

    const handleUpdate = () => {        
        if (camps.length === 0) {
            setAlert(true)
            setValues({ type: 'error', message: 'No changes detected' })
            return
        }
        mutate(camps[0])
        setEdit(false)
        setDisabled(false)
        setCamps([])
    }

    const handleEdit = () => {
        setEdit(!edit)
        setDisabled(!disabled)
    }

    if (isLoading) return <Spinner />

    return (
        <Container>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{ mt: 5 }}
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    isCellEditable={params => edit && params.row.id > 0}
                    editMode="row"
                    onSelectionModelChange={newSelection => setRows(newSelection)}
                    onRowEditStop={(params, e) => {                        
                        if (e.code === 'Enter') {
                            setAlert(true)
                            setEdit(false)
                            return setValues({ type: 'warning', message: 'Dont use Enter, Press the update button to save changes' })
                        }
                        if (camps.length > 0) {
                            setAlert(true)
                            setValues({ type: 'warning', message: 'you can only update one row at a time' })
                            return
                        }
                        setCamps([params.row])
                    }}
                />
            </div>
            <Button onClick={handleEdit} sx={{ mt: 3, ml: 1 }} variant='outlined'>{!edit ? 'Edit' : 'Stop'}</Button>
            {edit && <Button onClick={handleUpdate} sx={{ mt: 3, ml: 1 }} variant='outlined'>Update</Button>}
            <UserAddButton disabled={disabled} />
            {rows.length > 0 && <DeleteButton rows={rows} />}
        </Container>
    )
}