import React, { useState } from 'react'
import style from './Register.module.css'
import img1 from '../../assets/imgs/notes1.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  let [registerMsg, setRegisterMsg] = useState('')
  let [registerFailedMsg, setRegisterFailedMsg] = useState('')

  let navigate = useNavigate()

  function registerNavigate(){
    navigate('/')
  }


  function clearMsgs(){
    setRegisterFailedMsg('')
    setRegisterMsg('')
  }

  let validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Min length is 3 chars').max(20, 'Max length is 20 chars'),
    email: yup.string().required('Email is required').email('Please enter valid email'),
    password: yup.string().required('Password is required').matches(/^[A-Z][\w@]{7,10}$/, 'Invalid password ex:"Ahmed12"'),
    age: yup.number().required('Age is required').min(16, 'Min age is 16').max(60, 'Max age is 60'),
    phone: yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Please enter an egyptian phone number')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: '',
    }, onSubmit: registerSubmit
    , validationSchema
  })

  function registerSubmit(values) {
       console.log(values);
       axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
       .then((response) =>{
        console.log(response)
        setRegisterMsg(response.data.msg)
        navigate('/')
      } )

       .catch((err) =>{ 
        
        
        console.log(err)
        setRegisterFailedMsg(err.response.data.msg)
      
      })
  }


  return <>

    <div className={style.registerComponent}>


      <div className={style.logo}>
        <i className={`${style.iconLogo} fa-regular fa-note-sticky `}></i>
        <span className='fw-bold'> Notes</span>
      </div>

      <div className='container'>

        <div className='row gx-4 align-items-center justify-content-center'>

          <div className='col-md-5'>
            <img src={img1} alt='register img' width={430} />
          </div>

          <form onSubmit={formik.handleSubmit} className={`${style.formStyle} col-md-6`}>
            <h3>Sign Up Now</h3>

            <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' name='name' placeholder='Enter Your Name' className='form-control mt-2' />
            {(formik.touched.name && formik.errors.name) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.name}</div> : ''}

            <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' name='email' placeholder='Enter Your Email' className='form-control mt-2' />
            {(formik.touched.email && formik.errors.email) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.email}</div> : ''}

            <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' name='password' placeholder='Enter Your Password' className='form-control mt-2' />
            {(formik.touched.password && formik.errors.password) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.password}</div> : ''}

            <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' name='age' placeholder='Enter Your Age' className='form-control mt-2' />
            {(formik.touched.age && formik.errors.age) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.age}</div> : ''}

            <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='tel' name='phone' placeholder='Enter Your Phone Number' className='form-control mt-2' />
            {(formik.touched.phone && formik.errors.phone) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.phone}</div> : ''}

            {registerMsg? <p className='text-center fs-5 text-success mt-3 mb-0'>successfully registered</p>: ''}

            {registerFailedMsg? <p className='text-center fs-5 text-danger mt-3 mb-0'>{registerFailedMsg}</p>: ''}

             {(registerFailedMsg ||registerMsg )? <button type='submit' className={`${style.registerBtn} form-control mt-3 mb-1`} disabled>Sign Up</button> :<button type='submit' className={`${style.registerBtn} form-control mt-3 mb-1`}>Sign Up</button>}
           
            <span onClick={registerNavigate} className='fw-bold' role='button'>Already have account? Login</span>
          </form>


        </div>

      </div>

    </div>

  </>
}
