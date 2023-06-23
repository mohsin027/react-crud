import './App.css';
import Login from './components/Login/Login';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './components/Signup/Signup';
import UserHome from './components/UserHome/UserHome';
import axios from '././axios';
import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import EditProfile from './components/EditProfile/EditProfile';
import Adminhome from './components/Adminhome/Adminhome';
import Adminlogin from './components/Adminlogin/Adminlogin';
import EditUser from './components/EditUser/EditUser';
import CreateUser from './components/CreateUser/CreateUser';

function App() {
 const {user,admin,refresh}=useSelector((state)=>{
  return state
 });
 const dispatch =useDispatch();
  axios.defaults.withCredentials = true;
  useEffect(() => {
     axios.get('/checkAuth').then((response)=>{
      console.log(response);
      dispatch({type:'user',payload:{login: response.data.logged,details:response.data.details}});
     })   
     axios.get('/admin/adminAuth').then((response)=>{
      console.log(response);
      dispatch({type:'admin',payload:{adminLog:response.data.logged,details:response.data.details}})
     })
  }, [refresh])
  return (
    <div className="App">
      <Router>
        {
        user.login===false &&
        <Routes>
        <Route  element={<Login/>} path='/login'/>  
        <Route  element={<Signup/>} path='/signup'/>  
        <Route  element={<Navigate to={'/login'} />} path='/'/>  
        <Route  element={<Navigate to={'/login'} />} path='/editProfile'/> 

        </Routes>
        }
        {
        user.login===true &&
        <Routes>
        <Route  element={<Navigate to={'/'}/>} path='/login'/>  
        <Route  element={<Navigate to={'/'}/>} path='/signup'/>  
        <Route  element={<UserHome/>} path='/'/>  
        <Route  element={<EditProfile />} path='/editProfile'/> 
        </Routes>
        }
        { admin.adminLog===false && 
        <Routes>
          <Route element={<Adminlogin/>} path='/admin/adminLogin' />
          <Route element={<Navigate to={'/admin/adminLogin'}/>} path='/admin/adminHome' />
          <Route element={<Navigate to={'/admin/adminLogin'}/>} path='/admin/editUser:id'/>
          <Route element={<Navigate to={'/admin/adminLogin'}/>} path='/admin/createUser'/>
        </Routes>
        }
        { admin.adminLog===true && 
        <Routes>
          <Route element={<Navigate to={'/admin/adminHome'}/>} path='/admin/adminLogin' />
          <Route element={<Adminhome/>} path='/admin/adminHome' />
          <Route element={<EditUser/>} path='/admin/editUser/:id'/>
          <Route element={<CreateUser/>} path='/admin/createUser'/>
        </Routes>
        }

      </Router>
    </div>
  );
}

export default App;