import { useState, useContext } from "react";
import { inputs } from '../helper/tableInputs';
import { useFormik } from 'formik';
import { schema } from '../schema/schema';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/api";
import { modalCss } from "../helper/style";
import { AlertContext } from "../context/AlertContext";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";

export default function UserAddButton({ disabled }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const { setAlert, setValues } = useContext(AlertContext)

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            setAlert(true)
            setValues({ type: 'success', message: 'User created' })
            setOpen(false)
            queryClient.invalidateQueries('users')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const formik = useFormik({
        initialValues: {
            ...inputs.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {})
        },
        validationSchema: schema,
        onSubmit: (values) => {            
            mutate(values)
        }
    })

    const handleModal = () => setOpen(!open)

    return (
        <>
            <Button onClick={handleModal} disabled={disabled} sx={{ mt: 3, ml: 2 }} variant='contained'>Add</Button>
            <Modal
                open={open}
                onClose={handleModal}
            >
                <Paper onSubmit={formik.handleSubmit} component="form" sx={modalCss}>
                    <Grid container spacing={2} justifyContent="center">
                        {
                            inputs.map((input, i) => {
                                return (
                                    <Grid key={i} item md={10} xs={6}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            label={input.label}
                                            name={input.name}
                                            type={input.type}
                                            onChange={formik.handleChange}
                                            error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                                            helperText={formik.touched[input.name] && formik.errors[input.name]}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                )
                            })
                        }
                        <Grid item md={3} xs={3}>
                            <InputLabel>¿Active?</InputLabel>
                            <Select
                                name="active"
                                value={active}
                                label="Active"
                                sx={{ mt: 2 }}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    setActive(e.target.value)
                                }}
                            >                                
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <LoadingButton type="submit" variant="contained" sx={{ ml: 15.8, mt: 3 }}>Add</LoadingButton>
                </Paper>
            </Modal>
        </>
    )
}