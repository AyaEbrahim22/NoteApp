import React, { useState } from 'react'
import style from './Login.module.css'
import img1 from '../../assets/imgs/notes1.png' 
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  
  let [loginMsg, setLoginMsg] = useState('')
  let [loginFailedMsg, setLoginFailedMsg] = useState('')

  let navigate = useNavigate()

  function LoginNavigate(){
    navigate('/register')
  }


  function clearMsgs(){
    setLoginFailedMsg('')
    setLoginMsg('')
  }

  let validationSchema = yup.object({
    email: yup.string().required('Email is required').email('Please enter valid email'),
    password: yup.string().required('Password is required').matches(/^[A-Z][\w@]{7,10}$/, 'Invalid password ex:"Ahmed12"'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, onSubmit: loginSubmit
    , validationSchema
  })

  function loginSubmit(values) {
       console.log(values);
       axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
       .then((response) =>{
        console.log(response)
        setLoginMsg(response.data.msg)
        navigate('/home')
        localStorage.setItem('userToken',response.data.token )
      } )

       .catch((err) =>{ 
        
        
        console.log(err)
        setLoginFailedMsg(err.response.data.msg)
      
      })
  }

  
  return <>

  <div className={style.loginComponent}>

            
  <div className={style.logo}>
    <i className={`${style.iconLogo} fa-regular fa-note-sticky `}></i>
    <span className='fw-bold'> Notes</span>
  </div>

      <div className='container'>

  <div className='row gx-4 align-items-center justify-content-center'>

    <div className='col-md-5'>
        <img src={img1} alt='Login img' width={430}/>
    </div>

    <form onSubmit={formik.handleSubmit} className={`${style.formStyle} col-md-6`}>
      <h3>Sign In Now</h3>

      <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' name='email' placeholder='Enter Your Email' className='form-control mt-3'/>
      {(formik.touched.email && formik.errors.email) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.email}</div> : ''}

      <input onFocus={clearMsgs} onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' name='password' placeholder='Enter Your Password' className='form-control mt-3'/>
      {(formik.touched.password && formik.errors.password) ? <div className='mt-2 bg-danger text-light rounded-2 py-1 px-4 w-100 text-center'>{formik.errors.password}</div> : ''}

      {loginMsg? <p className='text-center fs-5 text-success mt-3 mb-0'>successfully logged</p>: ''}

      {loginFailedMsg? <p className='text-center fs-5 text-danger mt-3 mb-0'>{loginFailedMsg}</p>: ''}


      {(loginFailedMsg ||loginMsg )? <button type='submit' className={`${style.loginBtn} form-control mt-3 mb-1`} disabled>Login</button> :<button type='submit' className={`${style.loginBtn} form-control mt-3 mb-1`}>Login</button>}

      <span onClick={LoginNavigate} className='fw-bold' role='button'>Don't have account? Register</span>
    </form>

  </div>

      </div>

  </div>

</>
}






