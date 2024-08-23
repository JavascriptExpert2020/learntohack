import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
toast.configure()
//import '../card.css';
function UploadedBlog({img}) {
  const [posts, setPosts] = useState([]);
  const [loading,setloading] =useState(false);
  const params = useParams();

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
  useEffect(() => {
    setloading(true);
    getBlogByCategory();
  }, [])
    return (
        <div className="post">
        {loading?<div class="loading"></div>:''} 
      <img
        className="postImg"
        src={img}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            Lorem ipsum dolor sit amet
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p>
    </div>
    )
}

export default UploadedBlog
