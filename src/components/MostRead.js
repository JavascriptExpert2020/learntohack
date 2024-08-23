import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import { useHistory } from 'react-router-dom';
toast.configure()

function MostRead () {

  const [mostReadBlogs, setMostReadBlogs] = useState([]);
  const [tags, settags] = useState([]); 
  const [loading,setloading] =useState(false);
  const history = useHistory();

  function componentDidMount(){
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`).then(blogs => {
      console.log('most read',blogs);
      setMostReadBlogs(blogs.data.tag);
      setloading(false);
    }).catch(err => {
      setloading(false);
      toast.error('No Most read blogs Found');
    });
  }
  function getTags()
  {
    Axios.get(`${process.env.React_App_Api_Url}/api/blog/gettags`).then(blogs => {
      console.log('getTAgs',blogs);
      settags(blogs.data.tag.count);
      setloading(false);
    }).catch(err => {
      setloading(false);
      toast.error('No tags Found');
    });    
  }
  function splitDate(x)
  {
      let y = x.split('T');
      return y[0];
  }
  function allBlogsPage()
  {
    history.replace("/allblog");
  }
  useEffect(() => {
    setloading(true);
    getTags()
    componentDidMount()
  }, [])

    return (
        <div>
        {loading?<div class="loading"></div>:''} 
        <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">
                    <h2>Most Read</h2>
                  </div>
                </div>
                {
                  mostReadBlogs.length!=0 ?
                  mostReadBlogs.map( (mostReadBlog,index) => {
                    return (
                      <>
                      { index<4 ?
                      <div className="col-md-12">
                      <div className="post post-row">
                        <Link className="post-img" to={`/post/${mostReadBlog.id}`}><img src={mostReadBlog.image} alt="" style={{"height":"147px"}}/></Link>
                        <div className="post-body">
                          <div className="post-meta">
                            <Link className="post-category cat-2" to={`/post/${mostReadBlog.id}`}>{mostReadBlog.tag}</Link>
                            <span className="post-date">{splitDate(mostReadBlog.updatedAt)}</span>
                          </div>
                          <h3 className="post-title"><Link to={`/post/${mostReadBlog.id}`}>{mostReadBlog.title}</Link></h3>
                          <p style={{"color":"#fff"}}>{parse(mostReadBlog.text.substring(0, 100))}</p>
                          </div>
                        </div>
                      </div>:''}                    
                    </>
                    )
                  })
                  :<div>No blog found</div>
                }
                
                <div className="col-md-12">
                  <div className="section-row">
                    <button className="primary-button center-block" onClick={allBlogsPage}>Load More</button>
                  </div>
              </div>
              </div>
            </div>
   
            <div className="col-md-4">
             
              <div className="aside-widget">
                <div className="section-title">
                  <h2>Categories</h2>
                </div>
                 <div className="category-widget">
                  <ul>
                     { tags.length!=0 ?
                      tags.map( (tag,index)=>{
                        return (
                            <ul>
                              { 
                                (index+1)%4===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-1">{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index+1)%3===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-2">{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index+1)%2===0 ? <li><Link to={`/allblog/${tag.tag}`} className="cat-3">{tag.tag}<span>{tag.count}</span></Link></li> : 
                                (index)%2===0 ?<li><Link to={`/allblog/${tag.tag}`} className="cat-4">{tag.tag}<span>{tag.count}</span></Link></li> :''
                              }
                            </ul>
                        )
                      }):''
                    }                   
                  </ul>
              </div> 
              </div>
              {/*<div className="aside-widget">
                <div className="tags-widget">
                  {
                    tags.length!=0 ?
                    tags.map( (tag)=>{
                      return (
                        <>
                      <ul>
                        <li><a href="#">{tag.tag}</a></li>
                      </ul>
                      </>
                      )
                    }):''
                  }

                </div>
                </div>*/}
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}
export default MostRead
