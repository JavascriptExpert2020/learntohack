import React,{ useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import parse from "html-react-parser";
import renderHTML from 'react-render-html';
toast.configure()

function Blogdetails() {
      const history = useHistory();
      const params = useParams();
      const [id, setID] = useState(0)
      const [loading,setloading] = useState(false);
      const [posts, setPosts] = useState([])
      const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
      const [mostReadBlogs, setMostReadBlogs] = useState([]);
      const [featuredblogs, setfeaturedblogs] = useState([]); 
      function splitDate(x)
      {
          let y = x.split('T');
          return y[0];
      }
      function deleteBlog(e)
     {
        setloading(true)
        e.preventDefault();
        Axios.delete(`${process.env.React_App_Api_Url}/api/blog/deleteblog?id=${params.id}`)
          .then(res => {
            setloading(false)
            toast.success('Blog Deleted Successfully');
              history.replace("/myblogs");
          })
          .catch(err =>{
            setloading(false)
              toast.error('No Blogs Found');
          })        
    }
    function mostRead()
    {
        setloading(true)
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`).then(blogs => {
            setloading(false)
            setMostReadBlogs(blogs.data.tag);
          }).catch(err => {
            setloading(false)
            toast.error('No Most read blogs Found');
          });
    }
    function featuredBlogs()
    {
        setloading(true)
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
            setfeaturedblogs(blogs.data.tag)
            setloading(false)
         }).catch(err => {
            setloading(false)
            toast.error('No featured blogsFound');
          });
    }
    function getBlogById()
    {
        setloading(true)
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getblogbyid?id=${params.id}`)
          .then(res => {
            setloading(false)
            setPosts(res.data.resData)
          })
          .catch(err =>{
            setloading(false)
              console.log(err)
          })
    }
    function getBlogByIdSamePage(e,id)
    {
        setloading(true)
        e.preventDefault();
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getblogbyid?id=${id}`)
          .then(res => {
            setloading(false)
              setPosts(res.data.resData)
          })
          .catch(err =>{
            setloading(false);
            console.log(err)
          })
    }
      useEffect(()=> {
        mostRead()
        featuredBlogs()
        getBlogById()
      },[history.location.pathname]);
    return (
        <>
        {loading?<div className="loading">
   
        </div>:''}        
     <div className="section" >
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="section-row sticky-container">
                        <div className="main-post">
                        {
                            posts!==[] || posts!==undefined?
                            <>
                            <h3>{posts.title}</h3>
                            <figure className="figure-img">
                                <a href={posts.image} target="_blank"><img className="img-responsive" src={posts.image} alt="" /></a>
                            </figure>
                            <p style={{"color":"#fff"}}>{posts.title!==undefined?renderHTML(posts.text):''}</p>
                            </> :''
                        }

                            {/*
                            <p>The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. But what about your daily bread? Design comps, layouts, wireframes—will your clients accept that you go about things the facile way? Authorities in our business will tell in no uncertain terms that Lorem Ipsum is that huge, huge no no to forswear forever. Not so fast, I'd say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration.</p>
                            <figure className="figure-img">
                                <img className="img-responsive" src={posts.image} alt="" />
                                <figcaption>So Lorem Ipsum is bad (not necessarily)</figcaption>
                            </figure>
                            <p>You begin with a text, you sculpt information, you chisel away what's not needed, you come to the point, make things clear, add value, you're a content person, you like words. Design is no afterthought, far from it, but it comes in a deserved second. Anyway, you still use Lorem Ipsum and rightly so, as it will always have a place in the web workers toolbox, as things happen, not always the way you like it, not always in the preferred order. Even if your less into design and more into content strategy you may find some redeeming value with, wait for it, dummy copy, no less.</p>
                            <p>There's lot of hate out there for a text that amounts to little more than garbled words in an old language. The villagers are out there with a vengeance to get that Frankenstein, wielding torches and pitchforks, wanting to tar and feather it at the least, running it out of town in shame.</p>
                            <p>One of the villagers, Kristina Halvorson from Adaptive Path, holds steadfastly to the notion that design can’t be tested without real content:</p>
                            <blockquote className="blockquote">
                                I’ve heard the argument that “lorem ipsum” is effective in wireframing or design because it helps people focus on the actual layout, or color scheme, or whatever. What kills me here is that we’re talking about creating a user experience that will (whether we like it or not) be DRIVEN by words. The entire structure of the page or app flow is FOR THE WORDS.
                            </blockquote>
                            <p>If that's what you think how bout the other way around? How can you evaluate content without design? No typography, no colors, no layout, no styles, all those things that convey the important signals that go beyond the mere textual, hierarchies of information, weight, emphasis, oblique stresses, priorities, all those subtle cues that also have visual and emotional appeal to the reader. Rigid proponents of content strategy may shun the use of dummy copy but then designers might want to ask them to provide style sheets with the copy decks they supply that are in tune with the design direction they require.</p>
                            <h3>Summing up, if the copy is diverting attention from the design it’s because it’s not up to task.</h3>
                            <p>Typographers of yore didn't come up with the concept of dummy copy because people thought that content is inconsequential window dressing, only there to be used by designers who can’t be bothered to read. Lorem Ipsum is needed because words matter, a lot. Just fill up a page with draft copy about the client’s business and they will actually read it and comment on it. They will be drawn to it, fiercely. Do it the wrong way and draft copy can derail your design review.</p>
                            */}
                        </div>
                        <div className="post-shares sticky-shares">
                           {/* <a href="#" className="share-facebook"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="share-twitter"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="share-google-plus"><i className="fa fa-google-plus"></i></a>
                            <a href="#" className="share-pinterest"><i className="fa fa-pinterest"></i></a>
                            <a href="#" className="share-linkedin"><i className="fa fa-linkedin"></i></a>
                        <a href="#"><i className="fa fa-envelope"></i></a>*/}
                        {user ? posts.createdby==user.id ? 
                            <Link to="/myblog" className="share-linkedin" onClick={deleteBlog}><i className="fa fa-trash"></i></Link>
                        :'':''}
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Most Read</h2>
                        </div>
                        {
                            mostReadBlogs.length!=0 ?
                            mostReadBlogs.map( (mostReadBlog,index) => {
                              return (
                                <>
                                    {
                                        index<5?                                       
                                        <div className="post post-widget">
                                        <Link className="post-img" to={`/post/${mostReadBlog.id}`} ><img src={mostReadBlog.image} alt="" style={{"height":"90px"}}/></Link>
                                        <div className="post-body">
                                            <h3 className="post-title"><Link to={`/post/${mostReadBlog.id}`}>{mostReadBlog.title}</Link></h3>
                                        </div>
                                        </div>:''
                                    }

    
                                </>
                                )
                              }):''
                        }
                      
                    </div>
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Featured Posts</h2>
                        </div>
                        {
                            featuredblogs.length!=0 ? featuredblogs.map( (featuredblog,index) => {
                                return (
                                  <>
                                  {
                                      index<5?
                                      <div className="post post-thumb">
                                      <Link className="post-img" to={`/post/${featuredblog.id}`}><img src={featuredblog.image} alt="" style={{"height":"176px"}}/></Link>
                                      <div className="post-body">
                                          <div className="post-meta">
                                              <Link className="post-category cat-3" to={`/post/${featuredblog.id}`}>{featuredblog.tag}</Link>
                                              <span className="post-date">{splitDate(featuredblog.updatedAt)}</span>
                                          </div>
                                          <h3 className="post-title"><Link to={`/post/${featuredblog.id}`}>{featuredblog.title}</Link></h3>
                                      </div>
                                  </div>:''
                                  }

                                  </>
                                )
                                }):''
                        }
                   </div>
                    {/*<div className="aside-widget">
                        <div className="section-title">
                            <h2>Catagories</h2>
                        </div>
                        <div className="category-widget">
                            <ul>
                                <li><a href="#" className="cat-1">Web Design<span>340</span></a></li>
                                <li><a href="#" className="cat-2">JavaScript<span>74</span></a></li>
                                <li><a href="#" className="cat-4">JQuery<span>41</span></a></li>
                                <li><a href="#" className="cat-3">CSS<span>35</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="tags-widget">
                            <ul>
                                <li><a href="#">Chrome</a></li>
                                <li><a href="#">CSS</a></li>
                                <li><a href="#">Tutorial</a></li>
                                <li><a href="#">Backend</a></li>
                                <li><a href="#">JQuery</a></li>
                                <li><a href="#">Design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">JavaScript</a></li>
                                <li><a href="#">Website</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="aside-widget">
                        <div className="section-title">
                            <h2>Archive</h2>
                        </div>
                        <div className="archive-widget">
                            <ul>
                                <li><a href="#">January 2018</a></li>
                                <li><a href="#">Febuary 2018</a></li>
                                <li><a href="#">March 2018</a></li>
                            </ul>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Blogdetails
