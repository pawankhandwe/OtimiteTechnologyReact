import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function AuthComponent() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const currentuser = {
    email: "",
    password: "",
  };
  const handleLogin = () => {
    const registeredUsersJson = localStorage.getItem("registeredusers");
    
    if (registeredUsersJson !== null) {
      const registeredUsers = JSON.parse(registeredUsersJson);
      
      let loginSuccess = false;
  
      if (registeredUsers.length > 0) {
        for (const user of registeredUsers) {
         
          
          if (user.email === formData.email && user.password === formData.password) {
            loginSuccess = true;
            alert('login sucessful!');
            break;
          }
        }
      } 
  
      if (loginSuccess) {
        setUser(true);
        navigate("/DashBoard");
        localStorage.setItem("user", "true");
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("No users are registered!");
    }
  };
  

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h1>Login</h1>
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
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
}
