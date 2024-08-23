import React,{ useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
toast.configure()

function ForumDetails() {
    let stylesheet={
        display: "inline-block",margin: "auto"
      }
      const params = useParams();
      const [posts, setPosts] = useState([])
      const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
      const [comment, setComment] = useState({email:'',name:'',message:''});
      const [mostReadBlogs, setMostReadBlogs] = useState([]);
      const [featuredblogs, setfeaturedblogs] = useState([]); 
      const [loading,setloading] = useState(false);
    function splitDate(x)
    {
          let y = x.split('T');
          return y[0];
    }
    function mostRead()
      {
        Axios.get(`${process.env.React_App_Api_Url}/api/blog/getmostreadblogs`).then(blogs => {
              setMostReadBlogs(blogs.data.tag);
            }).catch(err => {
                setloading(false)
                toast.error('No Most read blogs Found');
            });
      }
      function featuredBlogs()
      {
          Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
              setfeaturedblogs(blogs.data.tag)
            }).catch(err => {
                setloading(false)
                toast.error('No featured blogsFound');
            });
      }
      function deleteComments(index)
      {
        setloading(true)
        Axios.delete(`${process.env.React_App_Api_Url}/api/forumcomment/deleteforumcomments?id=${posts.forum_comments[index].id}`)
        .then(res => {
            setloading(false)
            console.log('blog',res)
            setPosts([]);
            getForumById();
        })
        .catch(err =>{
            setloading(false)
            console.log(err)
        })
      }
      function getForumById()
      {
        setloading(true)
        Axios.get(`${process.env.React_App_Api_Url}/api/forum/getforumsbyid?id=${params.id}`)
        .then(res => {
            setloading(false)
            console.log('blog',res)
            setPosts(res.data.resData)
        })
        .catch(err =>{
            setloading(false)
            console.log(err)
        })
      }
      useEffect(()=> {
        getForumById();
        mostRead()
        featuredBlogs()
      },[]);
      function createComment(e)
      {
        e.preventDefault();
        setloading(true)
        if(user)
        {
            if(comment.message)
            {
                Axios.post(`${process.env.React_App_Api_Url}/api/forumcomment/createforumcomments`,{
                    comment:comment.message,
                    userid:user.id,
                    forumId:params.id
                })
                .then(res => {
                    toast.success('Comment posted successfully.');
                    getForumById();
                })
                .catch(err =>{
                    setloading(false)
                    console.log(err)
                    toast.error(`${err.response.data.message}`);
                })                            
            }
            else{
                setloading(false)
                toast.error('No message found to post.');
            }
        }
        else
        {
            setloading(false)
            toast.error('Login to comment on the forum.');
        }

      }
      function onChange(e)
      {
          const newUser = {...comment};
          if(e.target.id=='email')
          {
              newUser[e.target.id] = e.target.value
          }
          if(e.target.id=='message')
          {
              newUser[e.target.id] = e.target.value
          }
          if(e.target.id=='name')
          {
              newUser[e.target.id] = e.target.value
          }
          setComment(newUser);
      }
    return (
        <>
        {loading?<div className="loading">
   
        </div>:''}      
     <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="section-row sticky-container">
                        <div className="main-post">
                        {
                            posts.length!==0?
                            <>
                            <h3 >{posts.title}</h3>
                            <figure className="figure-img">
                                <img className="img-responsive" src={posts.image} alt="" />
                            </figure>
                            <p style={{"color":"#fff"}}>{posts.text}</p>
                            </>:''
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
                        {/*<div className="post-shares sticky-shares">
                            <a href="#" className="share-facebook"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="share-twitter"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="share-google-plus"><i className="fa fa-google-plus"></i></a>
                            <a href="#" className="share-pinterest"><i className="fa fa-pinterest"></i></a>
                            <a href="#" className="share-linkedin"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-envelope"></i></a>
                        </div>*/}
                    </div>

                    {/*<div className="section-row">
                        <div className="post-author">
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src="./img/author.png" alt="" />
                                </div>
                                <div className="media-body">
                                    <div className="media-heading">
                                        <h3>John Doe</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <ul className="author-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="section-row">
                        <div className="section-title">
                            <h2>{posts.forum_comments ? posts.forum_comments.length :''} Comments</h2>
                        </div>

                        <div className="post-comments">
                            <div className="media">
                                {/*<div className="media-left">
                                    <img className="media-object" src="./img/avatar.png" alt="" />
                </div>*/}
                                <div className="media-body">
                                {
                                    posts.length!==0 ? posts.forum_comments.length!==0 ?
                                           posts.forum_comments.map((comments,index)=>{
                                               return(
                                                   <>
                                                    <div className="media-heading">
                                                       <h4>{comments.User.firstName}</h4>
                                                       <span className="time">{comments.createdAt}</span>
                                                       {
                                                           user?comments.createdby==user.id?
                                                           <a className="reply" onClick={e=>deleteComments(index)}>Delete</a>:'':''
                                                       }
                                                    </div>
                                                    <p style={{"color":"#fff"}}>{comments.comment}</p>           
                                                   </>
                                               )
                                           }):<p style={{"backgroundColor":"#4BB92F","color":"#fff","paddingTop":"5px","paddingBottom":"5px","textAlign":"center"}}>Be the First to Comment.</p>:''
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-row">
                        <div className="section-title">
                            <h2>Leave a reply</h2>
                            <p style={{"color":"#fff"}}>Your email address will not be published. required fields are marked *</p>
                        </div>
                        <form className="post-reply">
                            <div className="row">
                            
                            {/* <div className="col-md-4">
                                    <div className="form-group">
                                        <span>Name *</span>
                                        <input className="input" type="text" name="name" id="name" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <span>Email *</span>
                                        <input className="input" type="email" name="email" id="email" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <span>Website</span>
                                        <input className="input" type="text" name="website" />
                                    </div>
                        </div>*/}
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea className="input" name="message" placeholder="Message *" id="message" onChange={onChange}></textarea>
                                    </div>
                                    <button className="primary-button" onClick={createComment}>Submit</button>
                                </div>
                            </div>
                        </form>
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
                                        <Link className="post-img" to={`/post/${mostReadBlog.id}`}><img src={mostReadBlog.image} alt="" style={{"height":"90px"}}/></Link>
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

export default ForumDetails
