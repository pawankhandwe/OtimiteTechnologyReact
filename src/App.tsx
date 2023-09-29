import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './component/DashBoard';
import Logout from './component/Logout';
import Login from './component/Login';
import  Cart  from './component/Cart';
import SignUp from './component/SignUp';
import Navbar from './component/navbar';
import {AuthProvider} from './component/auth';
import DashBoard from './component/DashBoard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='' element={<SignUp/>}></Route>
        <Route path='/DashBoard' element={<DashBoard/>}></Route>
        <Route path='/Cart' element={<Cart />}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
