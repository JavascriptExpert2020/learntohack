import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function Myblogs() {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
    const [loading,setloading] =useState(false);
    function componentDidMount()
    {
      Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmyallblog?id=${user.id}`).then(blogs => {
        console.log('All blogs',blogs);
        setloading(false);
        setRecentBlogs(blogs.data.blogs);
      }).catch(err => {
        toast.error('No Blogs Found');
        setloading(false);
      });
    }
    useEffect(() => {
      setloading(true);
      componentDidMount();
      }, [])
      function splitDate(x)
      {
          let y = x.split('T');
          return y[0];
      }
    return (
        <div>
        {loading?<div class="loading"></div>:''} 
            <div className="section" >
                <div className="container">   
                        <div className="row">
                                <div className="col-md-12">
                                    <div className="section-title">
                                        <h2>Blogs</h2>
                                        <button style={{"float":"right","margin-top":"-5%"}}><Link to="/uploadblog" key="abc"><i className="fa fa-plus" style={{"color":"#000"}}></i></Link></button>
                                        { recentBlogs.length!=0 ? 
                                            recentBlogs.map( (recentblog,index) =>{
                                              return(
                                                <>
                                                {
                                                  
                                                  <div className="col-md-4">
                                                  <div className="post">     
                                                  <Link className="post-img" to={`/post/${recentblog.id}`}><img src={recentblog.image} alt="" style={{"width":"300px","height":"300px"}}/></Link>
                                                    <div className="post-body">
                                                    <div className="post-meta">
                                                    {
                                                      (index+1)%4===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-1">{recentblog.tag}</Link> : 
                                                      (index+1)%3===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-2">{recentblog.tag}</Link>: 
                                                      (index+1)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-3">{recentblog.tag}</Link>: 
                                                      (index)%2===0 ?<Link to={`/post/${recentblog.id}`} className="post-category cat-4">{recentblog.tag}</Link>:''
                                                    }
                                                    <span className="post-date">{splitDate(recentblog.updatedAt)}</span>
                                                    </div>
                                                    <div className="post-meta">
                                                        {recentblog.verified===true?
                                                        <Link className="post-category cat-1" to={`/post/${recentblog.id}`}>Verified</Link>
                                                        :<Link className="post-category cat-5" to={`/post/${recentblog.id}`}>Not Verified</Link>}
                                                     
                                                        </div>
                                                    <h3 className="post-title" ><Link to={`/post/${recentblog.id}`}>{recentblog.title}</Link></h3>
                                                    </div>
                                                    </div>
                                                    </div>
                                                }         
                                                </>
                                              )
                                
                                            }):'No Blog Uploaded.'
                                          }
                                    </div>
                                </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Myblogs
