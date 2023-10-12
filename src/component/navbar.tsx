import { NavLink } from "react-router-dom"
import { useAuth } from "./auth"
import '../App.css'

export default function Navbar(){
     const {user}=useAuth()
   return (
     <div>
    <header>
      <nav>
        {user ? (
          <>
            <NavLink to="/Dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/Cart" className="nav-link">Cart</NavLink>
            <NavLink to="/logout" className="nav-link">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/Login" className="nav-link">Login</NavLink>
            <NavLink to="/SignUp" className="nav-link">SignUp</NavLink>
          </>
        )}
      </nav>
    </header>
  </div>
);
      
    
  }
