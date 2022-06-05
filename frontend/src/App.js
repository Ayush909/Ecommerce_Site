import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette : {
    primary : {
      main : "#ff6666"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar/>
        <Header/>
        <Routes>
          <Route path=''/>
        </Routes>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
