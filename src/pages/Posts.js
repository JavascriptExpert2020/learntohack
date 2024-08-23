import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

toast.configure()

function Posts() {
  const history = useHistory();
    const [posts, setPosts] = useState([]);
  const params = useParams();
  const [loading,setloading] =useState(false);
  function getBlogByCategory()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getblogbycategory?tag=${params.tag}`).then(blogs => {
      console.log('blog by category',blogs);
     setPosts(blogs.data.resData);
     setloading(false);
    }).catch(err => {
      setloading(false);
      toast.error('No Blog category Found');
    });
  }
  function getAllBlogs()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getAllblogs`).then(blogs => {
      setPosts(blogs.data.blogs);
      if(params.search!=='' & params.search!==undefined & params.search!==null)
      {
        setPosts( blogs.data.blogs.filter((result)=>{
          if(result.title.toLowerCase().includes(params.search))
          {
            return result.title.toLowerCase().includes(params.search)
          }
          else{
            setPosts([]);                       
          }
          }))
         setloading(false);    
      }
      else{
        setloading(false);
        setPosts(blogs.data.blogs);
      }
    }).catch(err => {
      setloading(false);
      toast.error('No Blogs Found');
    });
  }
  function searchfunc()
    {
          setPosts( posts.filter((result)=>{
              return result.title.toLowerCase().includes(params.search)
          }))
          setloading(false);

    }
  function splitDate(x)
  {
      let y = x.split('T');
      return y[0];
  }
  useEffect(() => {
    setloading(true);
    if(params.tag)
    {
      getBlogByCategory();
    }
    else{
      getAllBlogs();
    }
  }, [history.location.pathname])
    return (
        <>
        {loading?<div class="loading"></div>:''} 
        <div className="section" style={{"marginTop":"5%"}}>
        <div className="container">
            <div className="row">

        { posts.length!=0 ? 
            posts.map( (recentblog,index) =>{
              return(
                <>
                {
                <div className="col-md-4">
                  <div className="post">     
                  <Link className="post-img" to={`/post/${recentblog.id}`}><img src={recentblog.image} alt="" style={{"height":"176px"}}/></Link>
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
                    <h3 className="post-title" ><Link to={`/post/${recentblog.id}`}>{recentblog.title}</Link></h3>
                    </div>
                    </div>
                    </div>
                }         
                </>
              )

            }):'No blog found.'
          }
          </div>
          </div>
          </div>

        </>
    )
}

export default Posts
