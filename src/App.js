import { Container } from '@mui/system';
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Menu } from './features/menu/Menu';

function App() {
  return (
   <>
    <Navbar />
    <Container sx={{ flexGrow: 1 }}>
      <Menu />
    </Container>
   </>
  );
}

export default App;
