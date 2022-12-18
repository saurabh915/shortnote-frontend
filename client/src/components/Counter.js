import React from 'react'
const  loaded =async(e)=>{
    e.preventDefault();
  console.log("onoaded called")
    // TODO: API Call which is created in backend 
    const response = await fetch(`http://localhost:5000/api/auth/counts`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(

       

        )
    });
    const json = await response.json();
console.log(json);

}
function Counter() {
  return (
    <div style={{margin: "30px"}}>

      <button style={{alignItems: "center",justifyContent: "center", display: "block",margin:"auto"}} onClick={loaded}>counter</button>

    </div>
  )
}

export default Counter