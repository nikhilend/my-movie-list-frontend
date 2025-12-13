import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider}  from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import Feed from './components/Feed/Feed.jsx'
import AddEdit from './components/AddEdit/AddEdit.jsx'
import { Provider } from 'react-redux';
import store from './utils/store.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Footer from './components/Footer/Footer.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import SomeThingWentWrong from './components/SomeThingWentWrong.jsx'

const reactRoute = createBrowserRouter([
{
    path: "/login",
    element: <Login/>
},
{
  path: "/",
  element: <App/>,
  errorElement: <SomeThingWentWrong />,
  children:[
    {index: true, element: <Navigate to="/feed"/>},
    {
      path: "/feed",
      element: <ProtectedRoute><Feed /></ProtectedRoute>
    },
    {
      path: "/addedit/:action",
      element: <ProtectedRoute><AddEdit /></ProtectedRoute>
    },
    {
      path: "*",
      element: <PageNotFound/>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <div className='page-layout'>
      <RouterProvider router={reactRoute} />
    </div>

   <Footer/>
  </Provider>
)
