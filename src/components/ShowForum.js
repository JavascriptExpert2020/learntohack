import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function ShowForum() {

    const [allForums, setallForums] = useState([]);
    const [tags, settags] = useState([]); 
    const [loading,setloading] =useState(false);

    function componentDidMount()
    {
       Axios.get(`${process.env.React_App_Api_Url}/api/forum/getAllforums`).then(blogs => {
          console.log('All Forum',blogs);
          setallForums(blogs.data.blogs)
          setloading(false);
        }).catch(err => {
            toast.error('No Blogs Found');
            setloading(false);
          });
    }
    function getTags()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/forum/gettags`).then(blogs => {
      console.log('getTAgs',blogs);
      settags(blogs.data.tag)
    }).catch(err => {
      toast.error('No tags Found');
    });    
  }
    useEffect(() => {
        setloading(true);
        componentDidMount();
        getTags();
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
                    <div className="col-md-8">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2>Recent Forums</h2>
                            </div>
                        </div>
                        { allForums.length!==0 ? 
                            allForums.map( (forum,index) =>{
                              return(
                                <>
                                {
                                  index<6?
                                  <div className="col-md-6">
                                      <div className="post">     
                                          <Link className="post-img" to={`/forum/${forum.id}`}><img src={forum.image} alt="" style={{"width":"300px","height":"300px"}}/></Link>
                                          <div className="post-body">
                                               <div className="post-meta">
                                                    <Link className="post-category cat-2" to={`/forum/${forum.id}`}>{forum.tag}</Link>
                                                    <span className="post-date">{splitDate(forum.updatedAt)}</span>
                                                </div>
                                                    <h3 className="post-title" ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></h3>
                                            </div>
                                        </div>
                                    </div>:''
                                }         
                                </>
                              )
                
                            }):''
                          }
                    </div>
                </div>
        <div className="col-md-4">
              <div className="aside-widget">
                <div className="section-title">
                  <h2>Categories</h2>
                </div>
              </div>
                  {
                    tags.length!=0 ?
                        tags.map( (tag)=>{
                            return (
                                <>
                                   <div className="post post-widget">
                                        <ul>
                                            <li><a href="#">{tag.tag}</a></li>
                                        </ul>
                                    </div>
                                </>
                            )
                        })
                    :''
                  }
            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowForum
