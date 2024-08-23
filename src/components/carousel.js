import React,{useState,useEffect } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';
import Blogdetails from './Blog-details';
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
toast.configure()
function CarouselC() {
    const [featuredblogs, setfeaturedblogs] = useState([]);  
    function componentDidMount(){
       Axios.get(`${process.env.React_App_Api_Url}/api/blog/getfeaturedblogs`).then(blogs => {
          console.log('featured blogs',blogs);
          setfeaturedblogs(blogs.data.tag)
          // this.featuredblogs = blogs.data.tag;
        }).catch(err => {
          toast.error('No featured blogsFound');
        });
    }
    function splitDate(x)
    {
        let y = x.split('T');
        return y[0];
    }
    useEffect(() => {
      componentDidMount();
    }, [])
    return (
       
         <Carousel style={{"height":"50%",}} autoPlay>
            {featuredblogs.length!=0 ? featuredblogs.map( (featuredblog,index) => {
                return (
                    <>
                    <Link className="post-img" to={`/post/${featuredblog.id}`}><img src={featuredblog.image} alt="" /></Link>
                        <h1 className="post-title">{featuredblog.title}</h1>
                        </>
                )
            }):<div>No Featured Blogs</div>} 
      </Carousel>

    )
}

export default CarouselC
