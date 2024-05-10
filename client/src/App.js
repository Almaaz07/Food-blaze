import React from 'react'
import Resturant from './components/basics/resturant'
// import Menuecard from "./components/basics/menuCard"
// import "./style.css";
// import Time from './components/basics/Time';
import {Routes , Route} from 'react-router-dom'
import Cart from './components/basics/cart';
import { Toaster } from 'react-hot-toast';
import Cancel from './components/cancel';
import Success from './components/success';
import Register from './components/register';
import Login_signup from './components/login_signup';
// import Login_signup from './components/login_signup';

const App =()=> {
  return(
    <>

    
<Routes>
  <Route path='/' element ={<Login_signup/>}/>
  <Route path='/res' element ={<Resturant/>}/>
  <Route path='/Register' element ={<Register/>}/>
  <Route path='/Cart' element ={<Cart/>}/>
  <Route path='/success' element ={<Success/>}/>
  <Route path='/cancel' element ={<Cancel/>}/>
</Routes>
<Toaster/>
    </>
  )
  
  
  
  
  

  
}
export default App