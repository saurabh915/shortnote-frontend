import React,{useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'

import './ccss/navbar.css'

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');

  } 
    
    useEffect(() => {
        console.log(location.pathname)
      }, [location]);
  return (
    
    <nav className="navs bg-dark">
    <div className="container-fluid">

      <Link className="navbar-brand" to="/">iNotebook</Link>
    
      
     
       
          <li >
            <Link className={`nav-link ${location.pathname === "/" ? "active" :""}`} aria-current="page" to= "/"> Home </Link>
          </li>
          <li >
            <Link className= {`nav-link ${location.pathname==="/about" ? "active" :""}`}  to= "/about">About</Link>
          </li>
         
          
        
      

   {!localStorage.getItem('token')?<form className="button">
          <Link to="/login" className="btn btn-primary " role="button">Login</Link>
          <Link to="/signup" className="btn btn-primary button2" role="button">Signup</Link>

        </form> : <button onClick={handlelogout}className = "btn btn-primary">Logout</button>}
      </div>
    
  </nav>
  )
}

export default Navbar;
