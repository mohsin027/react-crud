import axios from '../../axios'
import React, { useState } from 'react'
import '../Login/Login.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function Adminlogin() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(email.trim()&&password.trim()){
        axios.post('/admin/adminLogin',{email,password}).then((response)=>{
            console.log(response.data);
            if(!response.data.err){
                dispatch({type:'refresh'});
                return navigate('/admin/adminHome')
            }else{
                setErr(response.data.message)
            }
        })
    }else{
        setErr('All fields are required')
    }
 
  }
  return (
    < >
       <div className='signup'>
  <div className='signup-connect'>
   
  </div>
  <div className='signup-classic'>
  <p className='errorMessage'>{err}</p>
    <form onSubmit={handleSubmit}  className='form'>
      <fieldset className='email'>
        <input type="email" placeholder="email" value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
      </fieldset>
      <button type="submit" className="btn">Login</button>
    </form>
 
  </div>
</div>
    </>
  )
}

export default Adminlogin
