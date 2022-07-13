//this file is useful to transfer our notes as props  

import NoteContext from "./noteContext";
//here we imported notecontext which is useful to storing the notes which will be useful to use as prop in any component
import { useState } from "react";

const NoteState = (props) => {
  // const s1 = {
  //     "name":"saurabh",
  //     "class":"sb"
  // }
  const host = "http://localhost:5000"

  const notesinitial = [
    
  ]
  //here state will be passed to each component

  //  const [state,setState] = useState(s1);
  const [notes, setNotes] = useState(notesinitial);








//fetch all Notes

const getNotes = async () => {
  // TODO: API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'auth-token': localStorage.getItem('token')
    }
  });
  const json = await response.json();
console.log("fetching all notes");
console.log(json);
setNotes(json);


//this will give all notes
 

}











  //Add a Note

  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      //for converting json into string
      body: JSON.stringify(

        { title, description, tag}

        )
    });
    //adding notes to frontend
    const note = await response.json();
    

    setNotes(notes.concat(note))



  
  }

  //Delete a Note

  const deleteNote = async (id) => {

    //for api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    
    });
    const json = await response.json();

    console.log("deleting the note with id" + id);
console.log(json);



    //the below command will return all the notes exept the notes which have _id == id of note which we have to  delete
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }



  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //For API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    
    //deep copying notes into newNotes
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      //for loop is to traverese the notes of each id 
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }







  //here update function will be passed to each component

  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"larry",
  //             "class":"10b"
  //         })
  //     }, 1000);
  // }/* this props.children will help us to pass the state and update function in all components */
  return (
    // <NoteContext.Provider value={{state:state,update:update}}>



    //here is how we transferd our props in NoteContext
    <NoteContext.Provider value={{ notes, addNote, deleteNote,getNotes,editNote }}>


      {props.children}


    </NoteContext.Provider>
  )
}

export default NoteState;