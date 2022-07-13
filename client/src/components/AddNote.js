import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/noteContext";
const AddNote = (props) => {
  //this is to import addnote prop from contextapi
  const context = useContext(noteContext);
  const {addNote} = context;
  //this is used to store new note values like title and description
  const [note,setNote] = useState({title:"",description:"",tag:""})
 
  const onChange =(e)=>{//here ...note means whatever the state value of note is should be remain as it is but as soon as some change occurs in given input fields run this function the input whose input value is changing access it from name  and add their values to note state 
    setNote(

    {...note,[e.target.name]:e.target.value}
    
    );

  }
   const handleClick  = (e)=>{
     e.preventDefault();
addNote(note.title, note.description, note.tag);
setNote({title:"",description:"",tag:""})
props.showAlert("note is added successfully","success");
  }
  return (
      <>
    <h2>Add a note</h2>
    <form className="conatainer">
<div className="col-auto">
  <label  htmlFor="title" >Title</label>
  <input type="text"  className="form-control-plaintext" id='title' 
  name='title'  placeholder="email@example.com" onChange={onChange} value={note.title}/>
</div>
<div className="col-auto">
  <label htmlFor="description" className="visually-hidden">description</label>
  <input type="text" className="form-control"  onChange={onChange} id="desc" name='description' placeholder="Password" value={note.description}/>
  <label htmlFor="tag" className="visually-hidden">Tag</label>
  <input type="text" className="form-control"  onChange={onChange} id="tag" name='tag' placeholder="Password" value={note.tag}/>
</div>
<div className="col-auto my-3">
  <button type="submit" className="btn btn-primary mb-3" onClick={handleClick} disabled = {note.title.length<5 || note.description.length<5 || note.tag.length<5}>Add Note</button>
</div>
</form>
      </>
  )
}

export default AddNote
