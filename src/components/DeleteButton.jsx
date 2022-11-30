import { useState, useContext } from "react"
import { deleteUsers } from "../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertContext } from "../context/AlertContext"
import Button from "@mui/material/Button"
import Delete from "@mui/icons-material/Delete"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from "@mui/lab/LoadingButton"

export default function DeleteButton({ rows }) {
    const [open, setOpen] = useState(false)

    const { setAlert, setValues } = useContext(AlertContext)

    const handleOpen = () => setOpen(!open)
    const handleDelete = () => mutate(rows)

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationFn: deleteUsers,
        onSuccess: (response) => {
            setAlert(true)
            setValues({ type: 'success', message: 'User deleted' })
            handleOpen()
            queryClient.invalidateQueries('users')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <>
            <Button onClick={handleOpen} sx={{ mt: 3, ml: 1 }} color="error" variant="contained">
                <Delete />
            </Button>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500 } }}
                open={open}
                onClose={handleOpen}
            >
                <DialogTitle>
                    {"¿Do you want to delete the user?"}
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={handleOpen}>Cancel</Button>
                    <LoadingButton variant="contained" loading={isLoading} color="error" onClick={handleDelete} autoFocus>
                        Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}