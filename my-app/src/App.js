import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import './App.css';
import UserDetails from './Components/UserDetails';
import Userfrom from './Components/Userfrom';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Userfrom/>}/>
      <Route path='/userdetails'  element={<UserDetails />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
