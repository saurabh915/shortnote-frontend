import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    let navigate = useNavigate();
     const [credentials, setCredentials] = useState({ email: "", password: ""})
    const handleSubmit=async (e)=>{
        //to stop reloading
        
        e.preventDefault();
  
            // TODO: API Call which is created in backend 
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
               
              },
              body: JSON.stringify(

                { email: credentials.email, password: credentials.password}
        
                )
            });
            const json = await response.json();
console.log(json);
if(json.success)
{
  props.showAlert("you logged in","success");
    //save the authtoken and redirect user to his notes
    localStorage.setItem('token',json.authToken);
    navigate("/");
}
else{
    props.showAlert("invalid credentials","danger");
}
    }
    const onChange = (e) => {
        //this will help to change the update note form
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }
    
  return (
    <div>
       <form onSubmit={handleSubmit} >

<div className="mb-3 row">
<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
<div className="col-sm-10">
<input type="email" className="form-control-plaintext"  value={credentials.email} onChange={onChange} name = "email" id='email'/>
</div>
</div>
<div className="mb-3 row">
<label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
<div className="col-sm-10">
<input type="password" className="form-control" id="Password"  name = "password" value={credentials.password}onChange={onChange} />
</div>
</div>
<button type="submit" className='btn btn-primary' >Submit </button>
  </form>
    </div>
  )
}


export default Login
