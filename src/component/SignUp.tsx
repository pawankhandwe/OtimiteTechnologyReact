
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

interface User {
  password: string;
  email: string;
}
const SignUp = () => {

const newUser: User = {
  email: "",
  password: "",
  
};

  const { user, setUserSignUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword:"",
  });
 

  const handleSignUp = () => {
    let signupSuccess = true; 
    if(formData.password!=formData.confirmpassword)
    {
      navigate("/SignUp");
alert('password not match!');
signupSuccess=false;
    }
    
    if (signupSuccess) {
     
    
      newUser.email = formData.email;
      newUser.password = formData.password;
   
  const storedData = localStorage.getItem('registeredusers');
  console.log(storedData);
  if(storedData==null)
  {
   let firstuser=[{email:'admin@gmail.com',password:'admin123'}];
   firstuser.push(newUser);
    localStorage.setItem('registeredusers',JSON.stringify(firstuser));
  }
  if(storedData!=null)
  {
    console.log("ddg");
    let registeredUsers: User[] = JSON.parse(storedData);
      registeredUsers.push(newUser);
      localStorage.setItem('registeredusers', JSON.stringify(registeredUsers));
      localStorage.setItem("user", "true");
      navigate("/Login");
      
  }
    } 
   
  };

  return (
    <>
    <h1>Welcome to SignUp Page</h1>
    <form>
    <div>
      <label htmlFor="email">email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
    </div>
    <br />
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
    </div>
    <br></br>
    <div>
      <label htmlFor="confirmpassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmpassword"
        name="confirmpassword"
        value={formData.confirmpassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmpassword: e.target.value })
        }
      />
    </div>
    <br />
    <button type="button" onClick={handleSignUp}>
      SignUp
    </button>
  </form>
  </>
  )
 
}

export default SignUp