
import Card from 'react-bootstrap/Card';

import style from './Notes.module.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { Fade, Flip, Slide } from 'react-awesome-reveal';

export default function Notes({ note, getNotes }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let formik = useFormik({
    initialValues:{
      title: "",
      content: '',
    },onSubmit: updateNote
  })


  function updateNote(values){
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values,{
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

  function deleteNote(){
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{
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


    return <>

<div className='col-md-6'>

         <Slide direction='up'>

            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                      {note.content}
                    </Card.Text>
                    <i className="fa-regular fa-pen-to-square fa-lg me-2" role='button' variant="primary" onClick={handleShow}></i>
                    <i className="fa-solid fa-trash fa-lg" onClick={() => deleteNote()} role='button'></i>
                </Card.Body>
            </Card>
    
         </Slide>

         </div>
      



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={style.iconLogo}>Add Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} type='text' name='title' id='title' className='form-control mt-2' placeholder='Please enter your title' defaultValue = {note.title}/>
            <textarea onChange={formik.handleChange} type='text' name='content' id='content' className='form-control my-3' rows={5} placeholder='Please enter your note' defaultValue = {note.content}></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit} type='submit'>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>


    </>
}
