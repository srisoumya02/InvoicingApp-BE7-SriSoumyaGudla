import './Navbar.css'
import { Link,useNavigate } from 'react-router-dom'
import React,{useState,useEffect} from "react";

export default function Navbar() {
  const navigate=useNavigate();
  const [loginStatus, setLoginStatus]=useState(false);

  useEffect(()=>{
      let token=localStorage.getItem("token");
      if(!token){
          setLoginStatus(false);
      }else{
          setLoginStatus(true);
      }
  },[loginStatus]);
  const onLogoutHandler=()=>{
      localStorage.clear();
      setLoginStatus(false);
      navigate("/user/login");
  }
  return ( 
    <nav className="navbar">
    <h1>Invoice App</h1>
    
    <div className="navbarcontent">
        <ul className="navbar-nav ">
            <li className="nav-item active">
                <Link to="/invoices/" className="nav-link">Invoices </Link>
            </li>
            <li className="nav-item active">
                <Link to="/invoices/new/" className="nav-link">New Invoice</Link>
            </li>
            
        </ul>
        <form className="form my-2 my-lg-0" style={{gap:'20px'}}>
            
            { loginStatus ? (
            <Link className="btn btn-danger" onClick={onLogoutHandler}>Logout</Link>
            ):(
                <>
                <Link className="btn btn-primary my-2 my-sm-0" to="/user/login/">Login</Link>
                <Link to="/user/signup/" className="btn btn-primary my-2 my-sm-0">SignUP</Link>
                </>
                
            )
        }
        </form>
    </div>
</nav>

  )
}
