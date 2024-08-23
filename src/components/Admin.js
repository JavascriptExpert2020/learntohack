import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
toast.configure()
function Admin() {
    const [allUsers, setUsers] = useState([]);
    const [search, setSearch] = useState({title:'',tag:'',email:''});
    const [tempBlog, settempBlog] = useState([]);
    const [loading,setloading] =useState(false);
    const [asc,setasc] =useState(true);
    function getUsers()
    {
        setloading(true);
        Axios.get(`${process.env.React_App_Api_Url}/api/user/allusers`).then(res=>{
            console.log(res);
            setUsers(res.data.usersList);
            settempBlog(res.data.usersList)   
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function splitDate(x)
    {
        let y = x.split('T');
        return y[0];
    }
    function updateUser(e,id)
    {
        setloading(true);
        Axios.get(`${process.env.React_App_Api_Url}/api/user/verifyuser?id=${id}`).then(res=>{
            getUsers();           
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Password Mismatched.');
        })
    }
    function searchfunc(e)
    {
        setloading(true);
        e.preventDefault();
        if(search.title!=='')
        {
            setUsers( allUsers.filter((result)=>{
                setloading(false);
                return result.verifed.toLowerCase() === search.title.toLowerCase()
            }))
        }
        if(search.tag!=='')
        {
            setUsers( allUsers.filter((result)=>{
                setloading(false);
                return result.mobile.toLowerCase().includes(search.tag.toLowerCase())
            }))
        }
        if(search.email!=='')
        {
            setUsers( allUsers.filter(result=>{
                setloading(false);
                return result.email.toLowerCase().includes(search.email.toLowerCase())
            })
            )
        }
        if(search.email!=='' && search.tag!=='')
        {
            setUsers( tempBlog.filter(result=>{
                setloading(false);
                return (result.email.toLowerCase().includes(search.email.toLowerCase()) && result.mobile.toLowerCase().includes(search.tag.toLowerCase()))
            })
            )
        }
        else{
            setloading(false);
        }
    }
    function sortByPriceAsc(e,col) {
        e.preventDefault();
        const sortByName = [...allUsers];
        if(col==='name')
        {
            sortByName.sort((a, b) => a.firstName > b.firstName ? 1 : -1)
        }
        if(col==='mobile')
        {
            sortByName.sort((a, b) => a.mobile > b.mobile ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.email > b.email ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1)
        }
        setUsers(sortByName);
        setasc(false);
      }

    function sortByPriceDesc(e,col) {
        e.preventDefault();
        const sortByName = [...allUsers];
        if(col==='name')
        {
            sortByName.sort((a, b) => a.firstName < b.firstName ? 1 : -1)
        }
        if(col==='mobile')
        {
            sortByName.sort((a, b) => a.mobile < b.mobile ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.email < b.email ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
        }
        setUsers(sortByName);
        setasc(true);
    }
    function clearSearch(e)
    {
        e.preventDefault()
        // window.location.reload();
        setUsers(tempBlog);
        setSearch({email:'',tag:'',title:''});
        document.getElementById('email').value='';
        document.getElementById('tag').value='';
       // document.getElementById('title').value='';
    }
    function onChange(e)
    {
        if(e.target.id=='title')
        {
            search[e.target.id] = e.target.value
        }
        if(e.target.id=='tag')
        {
            search[e.target.id] = e.target.value
        }
        if(e.target.id=='email')
        {
            search[e.target.id] = e.target.value
        }
    }
    useEffect(()=> {
        setloading(true);
        getUsers();
      },[]);
    return (
        <div className="section">
        {loading?<div class="loading"></div>:''} 
            <div className="container">
            <div className="container-fluid" style={{"padding": "0 50px","margin-top": "30px"}}>
            <div className="row" style={{"display": "block"}}>
                <div className="col-md-12">
                        <div className="col-md-4">
                            <input autocomplete="off" type="text" placeholder="Search by Mobile" style={{"border":"1px solid black","borderRadius":"8px"}} id="tag" onChange={onChange}/> 
                        </div>
                        {/*<div className="col-md-3">
                            <input autocomplete="off" type="text" placeholder="Search by Verified" style={{"border":"1px solid black","borderRadius":"8px"}} id="title" onChange={onChange}/> 
    </div>*/}
                        <div className="col-md-4">
                            <input autocomplete="off" type="text" placeholder="Search by Email" style={{"border":"1px solid black","borderRadius":"8px"}} id="email" onChange={onChange}/> 
                        </div>
                        <div className="col-md-4">
                            <button className="button2" onClick={e=>{searchfunc(e)}} >Search</button>
                            <button className="button2" onClick={e=>{clearSearch(e)}} style={{"marginLeft":"3%"}}>Clear</button>
                        </div>
                </div>
            </div>
            </div>
                <div className="row" style={{"marginTop":"3%"}}>
                    <div className="col-md-12">
                         <div className="section-row">
                                <h3>All Customers</h3>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <table className="table_custom_1" >
                                                    <thead>
                                                        <tr>
                                                            <th>Name &nbsp;&nbsp;
                                                            <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'name')}}></i>
                                                            <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'name')}}></i>
                                                            </th>
                                                            <th>Mobile &nbsp;&nbsp;
                                                            <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'mobile')}}></i>
                                                            <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'mobile')}}></i>
                                                            </th>
                                                            <th>Email &nbsp;&nbsp;
                                                            <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'email')}}></i>
                                                            <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'email')}}></i>
                                                            </th>
                                                            <th>Date &nbsp;&nbsp;
                                                            <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'date')}}></i>
                                                            <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'date')}}></i>
                                                            </th>
                                                            <th>Status</th>
                                                            <th >Actions</th>
                                                        </tr>
                                                        </thead>
                                                        {
                                                           allUsers!==[] || allUsers!==undefined ? allUsers.length!==0 ?
                                                            allUsers.map(user=>{
                                                                return(
                                                                    <>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td data-th="Name">
                                                                                    {user.firstName+' '+user.lastName}
                                                                            </td>
                                                                            <td data-th="Mobile">{user.mobile}</td>
                                                                            <td data-th="Email">{user.email}</td>
                                                                            <td data-th="Date">{splitDate(user.updatedAt)}</td>
                                                                            <td data-th="Status">{user.verifed?'Verified':'Not Verified'}</td>                                 
                                                                            <td>
                                                                                {user.verifed!==true?
                                                                                    <button className="button2" onClick={e=>{updateUser(e,user.id)}} className="primary-button">Mark Verified</button>:''    
                                                                                }
                                                                             </td>
                                                                        </tr>        
                                                                        </tbody>
                                                                        </>

                                                                )
                                                            }):'No users found':''
                                                        }
                                                </table>    
                                            </div>
                                        </div>
                                    </div>
                                    
                </div>
            </div>
        </div>
    )
}

export default Admin
