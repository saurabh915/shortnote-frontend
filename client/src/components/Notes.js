
//here we catch all notes by using useContext 

import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote'

import NoteItem from './Noteitem';
const Notes = (props) => {

  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
  //updateNote will run when we click the updateNote icon and out form value will be set as currntnote (hrere currentnote is original note which is passed as prop from noteItem )

  const updateNote = (currentNote) => {
    console.log("update");
    //  as it is called from the edit button click it will causes ref button to run modal 
    //here currentNote._id is used as _id is given automatically
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    ref.current.click();
   
  }
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') )
    {
      getNotes();

    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  
  const refclose = useRef(null);

  //creating new state which will be used to save title desc tag as etitle etag...
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })




  const handleClick = (e) => {
    console.log("Updating the note...", note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    e.preventDefault();
    refclose.current.click();
    props.showAlert("note is updated successfully","success");//this message and type is passed to the the app.js
  }

  const onChange = (e) => {
    //this will help to change the update note form
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote  showAlert = {props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>



      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="document">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <form className="conatainer">
                <div className="col-auto">
                  <label htmlFor="title" >Title</label>
                  <input type="text" className="form-control-plaintext" id='etitle'
                    name='etitle' placeholder="email@example.com" value={note.etitle} onChange={onChange} />
                </div>
                <div className="col-auto">
                  <label htmlFor="description" className="visually-hidden">description</label>
                  <input type="text" className="form-control" value={note.edescription} onChange={onChange} id="edescription" name='edescription' placeholder="Password" />
                  <label htmlFor="tag" className="visually-hidden">Tag</label>
                  <input type="text" className="form-control" value={note.etag} onChange={onChange} id="etag" name='etag' placeholder="Password" />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}
              disabled={note.etag.length<5 ||note.edescription.length<5 ||note.etitle.length<5 }>Update Note</button>
            </div>
          </div>
        </div>
      </div>












      <div className='row my-3'>
        <h2>Your  notes</h2>
        <div className="container mx-2"> 
                 {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {

          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
