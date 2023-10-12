

import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth"

export default function Logout(){

    
    const {setUser}=useAuth()
    const navigate=useNavigate();
    
    
    function handleclick()
    {
            setUser(false);   
            navigate("/Login");
            localStorage.setItem("user","false");         
    }
    
    return(

     <>
     <style>
        
     </style>
     <br></br>
    <button onClick={handleclick} className="logout-button">log out </button>
    </>
    )
}