import React, { useState } from 'react'
import './Login.css'
import axios from '../../axios'
import { BASE_URL } from '../../Constant/constant'
import { useNavigate ,Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'



function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(email.trim()&&password.trim()){
      axios.post(BASE_URL+'login',{email,password}).then((response)=>{
        console.log(response.data);
        if(!response.data.err){
        dispatch({type:'refresh',})
         return navigate('/')
        }else{
          setErr(response.data.message)
        }
      })
    }else{
      setErr("All fields are required")
    }

  }
  return (
    <div>
 <div className='signup'>
  <div className='signup-connect' >
   
  </div>
  <div className='signup-classic'>
     <h5 className='errorMessage'>{err}</h5>
    <form onSubmit={handleSubmit} className='form'>
      <fieldset className='email'>
        <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </fieldset>
      <fieldset className='password'>
        <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      </fieldset>
      <button type="submit" className="btn" style={{background:"#00a9f0"}}>Login</button>
    </form>
    <Link style={{textDecoration:'none',display:'flex' ,justifyContent:'center'}} to={'/signup'}>Signup ?</Link>
  </div>
</div>
    </div>
  )
}

export default Login
