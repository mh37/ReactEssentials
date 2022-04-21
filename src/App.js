
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavTabs from './components/NavTabs';


function App() {
  return (
    
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TrainingCenter
          </Typography>
        </Toolbar>
      </AppBar>
      <NavTabs />
    </div>
  );
}

export default App;
