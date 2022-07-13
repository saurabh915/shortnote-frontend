//here we do not have to import notecontext as it is passed as props from notes component
import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  
  const context = useContext(noteContext);
  const {deleteNote} = context; //previous const {notes, deleteNote} = context;
  

    const {note, updateNote} = props;
  return (
    <div className='col-md-3'>
     
      <div className="card my-3" >
 
  <div className="card-body">
    {/* for displaying note fetched from server  note.title is used*/}
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);  props.showAlert("note is deleted successfully","success");}}> </i>
                                 {/* as soon as we click on edit logo  update note will be called as prop and inside update note there will be reference to the button which casues pop up of modal */}
    <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note)}}></i>

 </div>
</div>
    </div>
  )
}


export default NoteItem
