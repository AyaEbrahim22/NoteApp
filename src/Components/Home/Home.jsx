import{ useEffect, useState }  from 'react'
import style from './Home.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { noteState } from '../Atoms/NoteAtoms';
import Notes from '../Notes/Notes';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  let navigate = useNavigate()

 let [noteLength, setNoteLength] = useRecoilState(noteState)

 let [allNotes, setAllNotes] = useState([])


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let formik = useFormik({
    initialValues:{
      title: "",
      content: '',
    },onSubmit: addNote
  })

  function addNote(values){
    axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, values,{
      headers:{
        token: `3b8ny__${localStorage.getItem('userToken')}`
      }
    })
    .then((response) => { 
      console.log(response)
      handleClose()
      getNotes()
    
    })
    .catch((err) => console.log(err))
  }

  function getNotes(){
    axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
      headers:{
        token: `3b8ny__${localStorage.getItem('userToken')}`
      }
    })
    .then((response) => {
      console.log(response)
      setNoteLength(response.data.notes.length)
      setAllNotes(response.data.notes)
    
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function logOut(){
    localStorage.removeItem('userToken')
    navigate('/')
  }

 useEffect(()=>{
    getNotes()
 }, [])

 return <>

<div className={style.topSide}>Notes App : {noteLength} </div>

  
  <div className='HomeComponent position-relative'>

  <div className='position-relative 100-vh'>
  <div className={style.sidebar}>

 <div className={style.logo}>
    <i className={`${style.iconLogo} fa-regular fa-note-sticky `}></i>
    <span> Notes</span>
    </div>

    <ul className={style.listItems}>
      <li className={style.listItem}>Home</li>
      <li className={style.listItem} onClick={()=> logOut()}>Logout</li>
    </ul>

  </div>
  </div>

<div className="container">
    <div className='row gx-4 w-75 m-auto mt-5 pt-5 gy-4'>

      {allNotes?.map((note, index)=> <Notes key={index} note = {note} getNotes={getNotes}/>)}

  </div>
</div>


  <button className={`${style.addNoteBtn} btn col-md-1`} variant="primary" onClick={handleShow}>+ Add Note</button>


  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={style.iconLogo}>Add Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} type='text' name='title' id='title' className='form-control mt-2' placeholder='Please enter your title'/>
            <textarea onChange={formik.handleChange} type='text' name='content' id='content' className='form-control my-3' rows={5} placeholder='Please enter your note'></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit} type='submit'>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  

  </>
}
