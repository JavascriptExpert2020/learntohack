import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

toast.configure()

function VerifyForums() {
    const history = useHistory();
    const [allForums, setForums] = useState([]);
    const [search, setSearch] = useState({title:'',tag:'',email:''});
    const [tempBlog, settempBlog] = useState([]);
    const [loading,setloading] =useState(false);
    const [asc,setasc] =useState(true);
    function forumdetails(e,id)
    {
        history.replace(`/forum/${id}`);
    }
    function splitDate(x)
    {
        let y = x.split('T');
        return y[0];
    }
    function sortByPriceAsc(e,col) {
        e.preventDefault();
        const sortByName = [...allForums];
        if(col==='title')
        {
            sortByName.sort((a, b) => a.title > b.title ? 1 : -1)
        }
        if(col==='tag')
        {
            sortByName.sort((a, b) => a.tag > b.tag ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.User.email > b.User.email ? 1 : -1)
        }
        if(col==='name')
        {
            sortByName.sort((a, b) => a.User.firstName > b.User.firstName ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1)
        }
        setForums(sortByName);
        setasc(false);
      }

    function sortByPriceDesc(e,col) {
        e.preventDefault();
        const sortByName = [...allForums];
        if(col==='title')
        {
            sortByName.sort((a, b) => a.title < b.title ? 1 : -1)
        }
        if(col==='tag')
        {
            sortByName.sort((a, b) => a.tag < b.tag ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.User.email < b.User.email ? 1 : -1)
        }
        if(col==='name')
        {
            sortByName.sort((a, b) => a.User.firstName < b.User.firstName ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
        }
        setForums(sortByName);
        setasc(true);
    }
    function getForums()
    {
        Axios.get(`${process.env.React_App_Api_Url}/api/forum/getadminforums`).then(res=>{
            console.log(res); 
            setForums(res.data.blogs);  
            settempBlog(res.data.blogs)           
            setloading(false);
        }).catch(err=>{
            toast.error('Password Mismatched.');
            setloading(false);
        })
    }
    function updateForum(e,id)
    {
        setloading(true);
        e.preventDefault();
        Axios.post(`${process.env.React_App_Api_Url}/api/forum/verifyforum?id=${id}`).then(res=>{
            console.log(res); 
            getForums();         
            setloading(false);
        }).catch(err=>{
            toast.error('Password Mismatched.');
            setloading(false);
        })
    }
    function unVerifyForum(e,id)
    {
        e.preventDefault();
        setloading(true);
        Axios.post(`${process.env.React_App_Api_Url}/api/forum/unverifyforum?id=${id}`).then(res=>{
            console.log(res); 
            getForums();         
            setloading(false);
        }).catch(err=>{
            toast.error('Password Mismatched.');
            setloading(false);
        })
    }
    function searchfunc(e)
    {
        e.preventDefault();
        setloading(true);
        if(search.title!=='')
        {
            setForums( allForums.filter((result)=>{
                setloading(false);
                return result.title.toLowerCase().includes(search.title.toLowerCase())
            }))
        }
        if(search.tag!=='')
        {
            setForums( allForums.filter((result)=>{
                setloading(false);
                return result.tag.toLowerCase().includes(search.tag.toLowerCase())
            }))
        }
        if(search.email!=='')
        {
            setForums( allForums.filter(result=>{
                setloading(false);
                return result.User.email.toLowerCase().includes(search.email.toLowerCase())
            })
            )
        }
        if(search.email!=='' && search.tag!=='')
        {
            setForums( tempBlog.filter(result=>{
                setloading(false);
                return (result.User.email.toLowerCase().includes(search.email.toLowerCase()) && result.tag.toLowerCase().includes(search.tag.toLowerCase()))
            })
            )
        }
        if(search.email!=='' && search.title!=='')
        {
            setForums( tempBlog.filter(result=>{
                setloading(false);
                return (result.User.email.toLowerCase().includes(search.email.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()))
            })
            )
        }
        if(search.tag!=='' && search.title!=='')
        {
            setForums( tempBlog.filter(result=>{
                setloading(false);
                return (result.tag.toLowerCase().includes(search.tag.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()))
            })
            )
        }
        if(search.tag!=='' && search.title!=='' && search.email)
        {
            setForums( tempBlog.filter(result=>{
                setloading(false);
                return (result.tag.toLowerCase().includes(search.tag.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()) && result.User.email.toLowerCase().includes(search.emailto.toLowerCase()))
            })
            )
        }
        else{
            setloading(false);
        }
    }
    function clearSearch(e)
    {
        e.preventDefault()
        // window.location.reload();
        setForums(tempBlog);
        setSearch({email:'',tag:'',title:''});
        document.getElementById('email').value='';
        document.getElementById('tag').value='';
        document.getElementById('title').value='';
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
        getForums();
      },[]);
    return (
        <div>
        {loading?<div class="loading"></div>:''} 
        <div className="section">
        <div className="container">
        <div className="container-fluid" style={{"padding": "0 50px","margin-top": "30px"}}>
        <div className="row" style={{"display": "block"}}>
            <div className="col-md-12">
                    <div className="col-md-3">
                        <input autocomplete="off" type="text" placeholder="Search by Tag" style={{"marginTop":"5%","border":"1px solid black","borderRadius":"8px"}} id="tag" onChange={onChange}/> 
                    </div>
                    <div className="col-md-3">
                        <input autocomplete="off" type="text" placeholder="Search by Title" style={{"marginTop":"5%","border":"1px solid black","borderRadius":"8px"}} id="title" onChange={onChange}/> 
                    </div>
                    <div className="col-md-3">
                        <input autocomplete="off" type="text" placeholder="Search by Email" style={{"marginTop":"5%","border":"1px solid black","borderRadius":"8px"}} id="email" onChange={onChange}/> 
                    </div>
                    <div className="col-md-3">
                        <button className="button2" onClick={e=>{searchfunc(e)}} style={{"marginTop":"5%"}}>Search</button>
                        <button className="button2" onClick={e=>{clearSearch(e)}} style={{"marginLeft":"3%","marginTop":"5%"}}>Clear</button>
                    </div>
            </div>
        </div>
        </div>
            <div className="row" style={{"marginTop":"3%"}}>
                <div className="col-md-12">
                     <div className="section-row">
                            <h3>Forums</h3>
                            <button style={{"float":"right","margin-top":"-4%"}}><Link to="/forum" key="abc"><i className="fa fa-plus" style={{"color":"#000"}}></i></Link></button>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <table className="table_custom_1" >
                                                <thead>
                                                    <tr>
                                                    <th>Title &nbsp;&nbsp;
                                                    <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'title')}}></i>
                                                    <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'title')}}></i>
                                                    </th>
                                                    <th>Tag&nbsp;&nbsp;
                                                    <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'tag')}}></i>
                                                    <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'tag')}}></i>
                                                    </th>
                                                    <th>Email &nbsp;&nbsp;
                                                    <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'email')}}></i>
                                                    <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'email')}}></i>
                                                    </th>
                                                    <th>Posted By&nbsp;&nbsp;
                                                    <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'name')}}></i>
                                                    <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'name')}}></i>
                                                    </th>
                                                    <th>Status
                                                    </th>
                                                    <th>Date&nbsp;&nbsp;
                                                    <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'date')}}></i>
                                                    <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'date')}}></i>
                                                    </th>
                                                        <th >Actions</th>
                                                        <th >View</th>
                                                    </tr>
                                                    </thead>    
                                                    {
                                                        allForums!==[] || allForums!==undefined ? allForums.length!==0 ?
                                                        allForums.map(Forum=>{
                                                            return(
                                                                <>
                                                                <tbody>
                                                                    <tr>
                                                                        <td data-th="title">
                                                                           {Forum.title}
                                                                        </td>
                                                                        <td data-th="Tag">{Forum.tag}</td>
                                                                        <td data-th="Email">{Forum.User.email}</td>
                                                                        <td data-th="Posted By">{Forum.User.firstName+' '+Forum.User.lastName}</td>
                                                                        <td data-th="Status">{Forum.verified?'Verified':'Not Verified'}</td>
                                                                        <td data-th="Date">{splitDate(Forum.updatedAt)}</td>
                                                                        <td>
                                                                            {Forum.verified!==true?
                                                                                <button className="button2" onClick={e=>{updateForum(e,Forum.id)}} >Mark Verified</button>:
                                                                                <button className="button2" onClick={e=>{unVerifyForum(e,Forum.id)}} >Mark Unverified</button>
                                                                            }
                                                                         </td>
                                                                         <td ><button className="button2" onClick={e=>{forumdetails(e,Forum.id)}} >View</button></td>
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
        </div>
    )
}

export default VerifyForums
