import React from 'react'

import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
import { RecoilRoot } from 'recoil'
import InverseProtectedRoute from './Components/InverseProtectedRoute/InverseProtectedRoute'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

export default function App() {
  
  
 let routes =  createHashRouter([
        {path: '', element: <Layout/>, children:[
          {index: true, element: <InverseProtectedRoute><Login/></InverseProtectedRoute>},
          {path: 'register', element: <InverseProtectedRoute><Register/></InverseProtectedRoute>},
          {path: 'home', element: <ProtectedRoute><Home/></ProtectedRoute>}
        ]}

  ])
  
  return <>

<RecoilRoot>
<RouterProvider router={routes}></RouterProvider>
</RecoilRoot>

  </>
}
