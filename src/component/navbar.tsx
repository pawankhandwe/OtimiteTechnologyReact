import { NavLink } from "react-router-dom"
import { useAuth } from "./auth"
import '../App.css'

export default function Navbar(){
     const {user}=useAuth()
   
    if (user===false) {
        return(
          <div>
          <header>
            <nav>       
              <NavLink  to="/Login">Login</NavLink>
              <NavLink to="/SignUp">SignUp</NavLink>
            </nav>
          </header>
        </div>
          )
        
      }
      else{
        return(
          <div>
          <header>
            <nav>
              <NavLink to="/DashBoard">DashBoard</NavLink>
              
              <NavLink to="/Cart">Cart</NavLink>
              <NavLink to="/logout">logout</NavLink>
            </nav>
          </header>
        </div>
        )  
    }
      
    
  }
