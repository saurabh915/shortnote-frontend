import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name:"" ,email: "", password: "",cpassword:""})
 const handleSubmit=async (e)=>{
     //to stop reloading
     
     e.preventDefault();
     //destructuring means assigning  array or objects elements to particular variables 
const {name,email,password}= credentials;
         // TODO: API Call
         const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
           method: 'POST',
           headers: {
             "Content-Type": "application/json",
            
           },
           body: JSON.stringify(

             { name,email,password}
     
             )
         });
         const json = await response.json();
console.log(json.authToken);

 //save the authtoken as token and redirect user to his notes
 if(json.success)
 {
    localStorage.setItem('token',json.authToken);
 navigate("/");
 props.showAlert("You logged in successfully ","success");
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
    <div className="container">
        <form onSubmit={handleSubmit} >
        <div className="mb-3 row">
<label htmlFor="Password" className="col-sm-2 col-form-label">Name</label>
<div className="col-sm-10">
<input type="text" className="form-control" id="name"  name = "name"  value={credentials.name} onChange={onChange}minLength={5} required />
</div>
</div>
        <div className="mb-3 row">
<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
<div className="col-sm-10">
<input type="email" className="form-control-plaintext" name = "email" id='email'  value={credentials.email} onChange={onChange} minLength={5} required/>
</div>
</div>


<div className="mb-3 row">
<label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
<div className="col-sm-10">
<input type="password" className="form-control" id="Password"  name = "password"  value={credentials.password}onChange={onChange}  />
</div>
</div>
<div className="mb-3 row">
<label htmlFor="cpassword" className="col-sm-2 col-form-label">Confirm Password</label>
<div className="col-sm-10">
<input type="password" className="form-control-plaintext" name = "cpassword" id='cpassword'  value={credentials.cpassword} onChange={onChange}/>
</div>
</div>
<button type="submit" className='btn btn-primary' >Submit </button>
  </form>
    </div>
  )
}

export default Signup
