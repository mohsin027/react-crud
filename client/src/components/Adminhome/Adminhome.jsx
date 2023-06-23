import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Adminhome.css'
import AdminNav from '../AdminNav/AdminNav'
 


function Adminhome() {
const [user, setuser] = useState([])
const [search, setSearch] = useState('')
const [refresh, setRefresh]=useState(false);
 
const imgURL='http://localhost:4000/upload_img/'
useEffect(() => {
    axios.get('/admin/userDetails?search='+search).then((response)=>{
        console.log(response.data.user);
        setuser(response.data.user)
    })
}, [search,refresh])
const handleDelete=(id)=>{
    axios.get('/admin/deleteUser'+id).then((response)=>{
        console.log(response.data);
        setRefresh(!refresh)
    })
}
  return (
    <div>
    <AdminNav setSearch={setSearch} search={search}></AdminNav>
    <div className="table-main">
        <div className="table-container">
          <table className="table align-middle mb-0 bg-white mt-3 rounded">
            <thead className="bg-light">
              <tr>
              <th>Image</th>
                <th>Name</th>
                <th >Email</th>
                <th style={{textAlign:'center',width:'150px'}}>Actions</th>
                <th style={{ width:'150px' }}> </th>
              </tr>  
            </thead>
            <tbody>
                {
                user.map((item,index)=>{
                    
                    return (
                        
                        <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image? imgURL+item.image.filename:'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'}
                              alt=''
                              style={{width: "45px", height: "45px"}}
                              className="rounded-circle"
                            />
                            
                          </div>
                        </td>
                        <td>
                        <div  >
                              <p className="fw-bold mb-1">{item.name}</p>
                              
                            </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{item.email}</p>
                        </td>
                         
                        <td>
                          <Link to={"/admin/editUser/"+item._id}>
                          <button>
                            Edit
                          </button>
                            </Link>
                            </td>
                            <td>
                        <button onClick={()=>handleDelete(item._id)} >Delete</button>
                        </td>
                      </tr>
                    )
                })
            } 
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Adminhome
