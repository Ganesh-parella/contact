import Home from './home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Form} from './Form'
import './App.css';
import { Details } from './details';


const App:React.FC=()=> {
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        path:'home/Add',
        element:<Form/>
      },
      {
        path:'home/details/:id',
        element:<Details/>
      },
      {
        path:'home/edit/:id',
        element:<Form/>
      }
    ]
  }
]) 

  return (
    <>
          <RouterProvider router={router}/>
    </>

  )
}




export default App;
