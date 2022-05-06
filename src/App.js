
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavTabs from './components/NavTabs';
import ContextProvider from './context/ContextProvider';


function App() {
  return (
    
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography component={'span'} variant="h6">
            TrainingCenter
          </Typography>
        </Toolbar>
      </AppBar>
      <ContextProvider>
        <NavTabs />
      </ContextProvider>
    </div>
  );
}

export default App;
