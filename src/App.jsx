import DataTable from './components/DataTable'
import TopBar from './components/TopBar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SnackAlert from './components/SnackAlert'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TopBar />
      <DataTable />
      <SnackAlert />
    </ThemeProvider>
  )
}

export default App
