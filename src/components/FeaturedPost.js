import React,{useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';
import Blogdetails from './Blog-details';
import { Link } from 'react-router-dom';

toast.configure()
function FeaturedPost() {
  const [loading,setloading] =useState(false);
  const [featuredblogs, setfeaturedblogs] = useState([]);  
  function blogdetail(e)
  {
    <Blogdetails ></Blogdetails>
  }
  function componentDidMount(){
     Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
        console.log('featured blogs',blogs);
        setfeaturedblogs(blogs.data.tag)
        setloading(false);
        // this.featuredblogs = blogs.data.tag;
      }).catch(err => {
        setloading(false);
        toast.error('No featured blogsFound');
      });
  }
  function splitDate(x)
  {
      let y = x.split('T');
      return y[0];
  }
  useEffect(() => {
    setloading(true);
    componentDidMount()
  }, [])

      return (
        <div className="section section-grey">
        {loading?<div class="loading"></div>:''} 
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Featured Posts</h2>
              </div>
            </div>
                {featuredblogs.length!=0 ? featuredblogs.map( (featuredblog,index) => {
                  return (
                    <>
                    {
                        index<3 ?                     
                    <div className="col-md-4" onClick={()=>{<Blogdetails blog={featuredblog}></Blogdetails>}}>
                        <div className="post">
                             <Link className="post-img" to={`/post/${featuredblog.id}`}><img src={featuredblog.image} alt="" style={{"height":"176px"}}/></Link>
                             <div className="post-body">
                               <div className="post-meta">
                                 <Link className="post-category cat-2" to={`/post/${featuredblog.id}`}>{featuredblog.tag}</Link>
                                 <span className="post-date">{splitDate(featuredblog.updatedAt)}</span>
                               </div>
                               <h3 className="post-title"><Link to={`/post/${featuredblog.id}`}>{featuredblog.title}</Link></h3>
                             </div>
                           </div>
                      </div>           :''

                    }

                      </> 
                    )}
                ):<div>No Featured Blogs</div>} 
          </div>
        </div>
      </div> 
    )
}
export default FeaturedPost

