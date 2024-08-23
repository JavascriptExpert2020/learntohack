import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
toast.configure()

function Admincontactus() {
    const history = useHistory();
    const [allBlogs, setBlogs] = useState([]);
    const [tempBlog, settempBlog] = useState([]);
    const [search, setSearch] = useState({name:'',mobile:'',email:''});
    const [loading,setloading] =useState(false);
    const [asc,setasc] =useState(true);
    function splitDate(x)
    {
        let y = x.split('T');
        return y[0];
    }
    function getBlogs()
    {
        Axios.get(`${process.env.React_App_Api_Url}/api/contactus/getAll`).then(res=>{
            console.log(res); 
            setBlogs(res.data.contactUs);
            settempBlog(res.data.contactUs)          
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function searchfunc(e)
    {
        setloading(true);
        e.preventDefault();
        if(search.name!=='')
        {
            setBlogs( tempBlog.filter((result)=>{
                setloading(false);
                return result.name.toLowerCase().includes(search.name.toLowerCase())
            }))
        }
        if(search.mobile!=='')
        {
            setBlogs( tempBlog.filter((result)=>{
                setloading(false);
                return result.contact_number.includes(search.mobile)
            }))
        }
        if(search.email!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return result.email.toLowerCase().includes(search.email.toLowerCase())
            })
            )
        }
        if(search.email!=='' && search.name!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.email.toLowerCase().includes(search.email.toLowerCase()) && result.name.toLowerCase().includes(search.name.toLowerCase()))
            })
            )
        }
        if(search.email!=='' && search.mobile!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.email.toLowerCase().includes(search.email.toLowerCase()) && result.contact_number.includes(search.contact_number))
            })
            )
        }
        if(search.email!=='' && search.mobile!=='' && search.name!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.email.toLowerCase().includes(search.email.toLowerCase()) && result.contact_number.includes(search.mobile.toLowerCase()) && result.name.toLowerCase().includes(search.name.toLowerCase()))
            })
            )
        }
        
        else{
            setloading(false);
        }
    }
    function sortByPriceAsc(e,col) {
        e.preventDefault();
        const sortByName = [...allBlogs];
        if(col==='name')
        {
            sortByName.sort((a, b) => a.name > b.name ? 1 : -1)
        }
        if(col==='mobile')
        {
            sortByName.sort((a, b) => a.contact_number > b.contact_number ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.email > b.email ? 1 : -1)
        }
        if(col==='subject')
        {
            sortByName.sort((a, b) => a.subject > b.subject ? 1 : -1)
        }
        if(col==='message')
        {
            sortByName.sort((a, b) => a.message > b.message ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1)
        }
        setBlogs(sortByName);
        setasc(false);
      }

    function sortByPriceDesc(e,col) {
        e.preventDefault();
        const sortByName = [...allBlogs];
        if(col==='name')
        {
            sortByName.sort((a, b) => a.name < b.name ? 1 : -1)
        }
        if(col==='mobile')
        {
            sortByName.sort((a, b) => a.contact_number < b.contact_number ? 1 : -1)
        }
        if(col==='email')
        {
            sortByName.sort((a, b) => a.email < b.email ? 1 : -1)
        }
        if(col==='subject')
        {
            sortByName.sort((a, b) => a.subject < b.subject ? 1 : -1)
        }
        if(col==='message')
        {
            sortByName.sort((a, b) => a.message < b.message ? 1 : -1)
        }
        if(col==='date')
        {
            sortByName.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
        }
        setBlogs(sortByName);
        setasc(true);
    }
    function clearSearch(e)
    {
        e.preventDefault()
        // window.location.reload();
        setBlogs(tempBlog);
        setSearch({email:'',mobile:'',name:''});
        document.getElementById('email').value='';
        document.getElementById('mobile').value='';
        document.getElementById('name').value='';
    }
    function onChange(e)
    {
        if(e.target.id==='name')
        {
            search[e.target.id] = e.target.value
        }
        if(e.target.id==='mobile')
        {
            search[e.target.id] = e.target.value
        }
        if(e.target.id==='email')
        {
            search[e.target.id] = e.target.value
        }
    }
    useEffect(()=> {
        setloading(true);
        getBlogs();
      },[]);
    return (
        <div className="section">
        {loading?<div class="loading"></div>:''} 
        <div className="container">
            <div className="container-fluid" style={{"padding": "0 50px","margin-top": "30px"}}>
                <div className="row" style={{"display": "block"}}>
                    <div className="col-md-12">
                            <div className="col-md-3">
                                <input autocomplete="off" type="text" placeholder="Search by Name" style={{"border":"1px solid black","borderRadius":"8px","marginTop":"5%"}} id="name" onChange={onChange}/> 
                            </div>
                            <div className="col-md-3">
                                <input autocomplete="off" type="text" placeholder="Search by Mobile" style={{"border":"1px solid black","borderRadius":"8px","marginTop":"5%"}} id="mobile" onChange={onChange}/> 
                            </div>
                            <div className="col-md-3">
                                <input autocomplete="off" type="text" placeholder="Search by Email" style={{"border":"1px solid black","borderRadius":"8px","marginTop":"5%"}} id="email" onChange={onChange}/> 
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
                            <h3>Contact Us Requests</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <table className="table_custom_1" >
                                                    <thead>
                                                    <tr>
                                                        <th>Name &nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'name')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'name')}}></i>
                                                        </th>
                                                        <th>Contact Number&nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'mobile')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'mobile')}}></i>
                                                        </th>
                                                        <th>Email &nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'email')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'email')}}></i>
                                                        </th>
                                                        <th>Subject
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'subject')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'subject')}}></i>
                                                        </th>
                                                        <th>Message&nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'message')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'message')}}></i>
                                                        </th>
                                                        <th>Date&nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'date')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'date')}}></i>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        allBlogs!==[] || allBlogs!==undefined ? allBlogs.length!==0 ?
                                                        allBlogs.map(Blog=>{
                                                            return(
                                                                <>
                                                                <tbody>
                                                                <tr >
                                                                        <td>
                                                                            <div className="company-name">
                                                                            {Blog.name?Blog.name:'---'}
                                                                            </div>
                                                                        </td>
                                                                        <td>{Blog.contact_number?Blog.contact_number:'---'}</td>
                                                                        <td>{Blog.email?Blog.email:'---'}</td>
                                                                        <td>{Blog.reason?Blog.reason:'---'}</td>
                                                                        <td>{Blog.message?Blog.message:'---'}</td>
                                                                        <td>{splitDate(Blog.updatedAt)}</td>
                                                                    </tr>        
                                                                    </tbody>
                                                                    </>
                                                            )
                                                        }):'No Contact Us request found':''
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

export default Admincontactus
