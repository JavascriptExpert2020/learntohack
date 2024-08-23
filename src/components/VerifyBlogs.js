import React,{ useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
toast.configure()
function VerifyBlogs() {
    const history = useHistory();
    const [allBlogs, setBlogs] = useState([]);
    const [tempBlog, settempBlog] = useState([]);
    const [search, setSearch] = useState({title:'',tag:'',email:''});
    const [loading,setloading] =useState(false);
    const [asc,setasc] =useState(true);
    function blogdetails(e,id)
    {
        history.replace(`/post/${id}`);
    }
    function splitDate(x)
    {
        let y = x.split('T');
        return y[0];
    }
    function getBlogs()
    {
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getAdminblogs`).then(res=>{
            console.log(res); 
            setBlogs(res.data.blogs);
            settempBlog(res.data.blogs)          
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function updateBlog(e,id)
    {
        setloading(true);
        e.preventDefault();
        Axios.post(`${process.env.React_App_Api_Url}/api/blog/verifyblog?id=${id}`).then(res=>{
            console.log(res); 
            getBlogs();         
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function unVerifiedBlog(e,id)
    {
        e.preventDefault();
        setloading(true);
        Axios.post(`${process.env.React_App_Api_Url}/api/blog/unverifyblog?id=${id}`).then(res=>{
            console.log(res); 
            getBlogs();         
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function featuredBlog(e,id)
    {
        e.preventDefault();
        setloading(true);
        Axios.post(`${process.env.React_App_Api_Url}/api/blog/markfeaturedblog?id=${id}`).then(res=>{
            console.log(res); 
            getBlogs();         
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong.');
        })
    }
    function unFeaturedBlog(e,id)
    {
        setloading(true);
        e.preventDefault();
        Axios.post(`${process.env.React_App_Api_Url}/api/blog/markunfeaturedblog?id=${id}`).then(res=>{
            console.log(res); 
            getBlogs();         
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
        if(search.title!=='')
        {
            setBlogs( tempBlog.filter((result)=>{
                setloading(false);
                return result.title.toLowerCase().includes(search.title.toLowerCase())
            }))
        }
        if(search.tag!=='')
        {
            setBlogs( tempBlog.filter((result)=>{
                setloading(false);
                return result.tag.toLowerCase().includes(search.tag.toLowerCase())
            }))
        }
        if(search.email!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return result.User.email.toLowerCase().includes(search.email.toLowerCase())
            })
            )
        }
        if(search.email!=='' && search.tag!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.User.email.toLowerCase().includes(search.email.toLowerCase()) && result.tag.toLowerCase().includes(search.tag.toLowerCase()))
            })
            )
        }
        if(search.email!=='' && search.title!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.User.email.toLowerCase().includes(search.email.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()))
            })
            )
        }
        if(search.tag!=='' && search.title!=='')
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.tag.toLowerCase().includes(search.tag.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()))
            })
            )
        }
        if(search.tag!=='' && search.title!=='' && search.email)
        {
            setBlogs( tempBlog.filter(result=>{
                setloading(false);
                return (result.tag.toLowerCase().includes(search.tag.toLowerCase()) && result.title.toLowerCase().includes(search.title.toLowerCase()) && result.User.email.toLowerCase().includes(search.email.toLowerCase()))
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
        setBlogs(sortByName);
        setasc(false);
      }

    function sortByPriceDesc(e,col) {
        e.preventDefault();
        const sortByName = [...allBlogs];
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
        setBlogs(sortByName);
        setasc(true);
    }
    function clearSearch(e)
    {
        e.preventDefault()
        // window.location.reload();
        setBlogs(tempBlog);
        setSearch({email:'',tag:'',title:''});
        document.getElementById('email').value='';
        document.getElementById('tag').value='';
        document.getElementById('title').value='';
    }
    function onChange(e)
    {
        if(e.target.id==='title')
        {
            search[e.target.id] = e.target.value
        }
        if(e.target.id==='tag')
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
                                <button className="button2" onClick={e=>{clearSearch(e)}} style={{"marginLeft":"3%"}}>Clear</button>
                            </div>
                    </div>
                </div>
                </div>
            <div className="row" style={{"marginTop":"3%"}}>
                <div className="col-md-12">
                     <div className="section-row">
                            <h3 >Blogs</h3>
                            <button style={{"float":"right","margin-top":"-4%"}}><Link to="/uploadblog" key="abc"><i className="fa fa-plus" style={{"color":"#000"}}></i></Link></button>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <table className="table_custom_1" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Title &nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'title')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'title')}}></i>
                                                        </th>
                                                        <th scope="col" >Tag&nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'tag')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'tag')}}></i>
                                                        </th>
                                                        <th scope="col">Email &nbsp;&nbsp;
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'email')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'email')}}></i>
                                                        </th>
                                                        <th scope="col" >Posted By
                                                        <i className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'name')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'name')}}></i>
                                                        </th>
                                                        <th scope="col" >Status
                                                        </th>
                                                        <th scope="col" >Date
                                                        <i  className="fa fa-arrow-up" onClick={(e)=>{sortByPriceAsc(e,'date')}}></i>
                                                        <i className="fa fa-arrow-down" onClick={(e)=>{sortByPriceDesc(e,'date')}}></i>
                                                        </th>
                                                        <th scope="col" >View</th>
                                                        <th scope="col" >Verify/Unverify</th>
                                                        <th scope="col" >Featured/Unfeatured</th>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        allBlogs!==[] || allBlogs!==undefined ? allBlogs.length!==0 ?
                                                        allBlogs.map(Blog=>{
                                                            return(
                                                                <>
                                                                <tbody>
                                                                    <tr >
                                                                        <td data-th="Title">
                                                                           {Blog.title?Blog.title:'---'}
                                                                        </td>
                                                                        <td data-th="Tag">{Blog.tag?Blog.tag:'---'}</td>
                                                                        <td data-th="Email">{Blog.User?Blog.User.email:'---'}</td>
                                                                        <td data-th="Posted By">{Blog.User?Blog.User.firstName+' '+Blog.User.lastName:'---'}</td>
                                                                        <td data-th="Verified">{Blog.verified?'Verified':'Not Verified'}</td>
                                                                        <td data-th="Date">{splitDate(Blog.updatedAt)}</td>
                                                                        <td ><button className="button2" onClick={e=>{blogdetails(e,Blog.id)}} >View</button></td>
                                                                        <td>
                                                                            {Blog.verified!==true?
                                                                                <button className="button2" onClick={e=>{updateBlog(e,Blog.id)}} >Mark Verified</button>:
                                                                                <button className="button2" onClick={e=>{unVerifiedBlog(e,Blog.id)}} >Mark Unverified</button>
                                                                            }
                                                                         </td>
                                                                         <td>
                                                                         {Blog.featured!==true?
                                                                             <button className="button2" onClick={e=>{featuredBlog(e,Blog.id)}} >Mark Featured</button>:
                                                                             <button className="button2" onClick={e=>{unFeaturedBlog(e,Blog.id)}} >Mark Unfeatured</button>
                                                                         }
                                                                          </td>
                                                                    </tr>        
                                                                    </tbody>
                                                                </>
                                                            )
                                                        }):'No Blogs found':''
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

export default VerifyBlogs
