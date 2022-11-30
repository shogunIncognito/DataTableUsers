import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackAlert() {
    const { alert, setAlert, values: {type, message} } = useContext(AlertContext)
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alert}
            autoHideDuration={3000}
            onClose={() => setAlert(false)}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    )
}