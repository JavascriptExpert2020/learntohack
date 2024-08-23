import React,{useState} from 'react';
import './uploadblogcss/card.css';
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
toast.configure()

function UploadForum() {
    const [dataUri, setDataUri] = useState('');
    const [url, setUrl] = useState('')
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
    const[blog,setBlog] = useState({desc:'',title:'',tag:''});
    const [loading,setloading] =useState(false);
    const history = useHistory();

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result)
      };
      reader.readAsDataURL(file);
      })
      function onChange(e)
      {
          const newUser = {...blog};
          if(e.target.id==='desc')
          {
              newUser[e.target.id] = e.target.value
          }
          if(e.target.id==='title')
          {
              newUser[e.target.id] = e.target.value
          }
          if(e.target.id==='tag')
          {
              newUser[e.target.id] = e.target.value
          }
          setBlog(newUser);
      }
  
    function dataURItoBlob(dataURI) {
       let formData = new FormData();
       formData.append('file', dataURI);
        Axios.post(`${process.env.React_App_Api_Url}/api/aws/file?email=${user.email}`,formData).then(res=>{
            setUrl(res.data.url);
           setloading(false);
        }).catch(err=>{
            console.log(err);
            setloading(false);
          })
    }
    function publishBlog(e)
    {
      e.preventDefault();
      let formData = new FormData();
      setloading(true);
      formData.append('file', dataUri);
       if(dataUri !== '' && blog.desc !== '' && blog.title !== '' && blog.tag !== '')
       {
            Axios.post(`${process.env.React_App_Api_Url}/api/forum/createforums`,{
            image:url,
            title:blog.title,
            text:blog.desc,
            userid:user.id,
            verified:false,
            tag:blog.tag
          }).then(res=>{
            toast.success('Forum uploaded successfully. Our Admin will verify it shortly.');
            setBlog({desc:'',title:'',tag:''});
            setDataUri('');
            setloading(false);
            history.replace("/myforums");
          }).catch(err=>{
              console.log(err);
              toast.error('Something went wrong. Please try later.');
              setloading(false);
            })
       }
       else{
          toast.error('All feilds are required. Fill all feilds to publish blog.');
          setloading(false);
        }
    }
    const onImageChange = (file) => {
      setloading(true);
      if(!file) {
        setDataUri('');
        return;
      }
     
      if(file.type==='image/png' || file.type==='image/jpeg')
      {
        fileToDataUri(file)
        .then(dataUri => {
          setDataUri(dataUri);
          dataURItoBlob(file);
          
        })
      }  
      else
      {
        toast.error('Please select only png/jpeg format of image.');
        setloading(false);
      }       
      
    }
  
      return (
          <div className="write">
          {
                dataUri!=='' ?
                <img
                className="writeImg"
                src={dataUri}
                alt=""
              />:
              <img
              className="writeImg"
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          }
          {loading?<div class="loading"></div>:''} 
          <form className="writeForm" onSubmit={publishBlog}>
          <div className="writeFormGroup" style={{"marginTop":"3%"}}>
          <label >
            <i className="writeIcon fa fa-upload"></i>
          </label>
          <label className="writeFile">
          &nbsp;&nbsp;Browse Image&nbsp;&nbsp;<input id="fileInput" type="file" accept="image/*"  onChange={(event) => onImageChange(event.target.files[0] || null)} hidden/>
          </label>
        </div>

        <div className="writeFormGroup" style={{"marginTop":"3%"}}>
          <input
            className="writeInput"
            placeholder="Title *"
            type="text"
            id="title"
            onChange={onChange}
            style={{border:"1px solid peru","borderRadius":"10px"}}
          />
        
        </div>
        <div className="writeFormGroup" style={{"marginTop":"3%"}}>
              <input
              className="writeInput"
              placeholder="Tag *"
              type="text"
              id="tag"
              onChange={onChange}
              style={{border:"1px solid peru","borderRadius":"10px"}}
              />
        </div>
            <div className="writeFormGroup" style={{"marginTop":"3%"}}>
              <textarea
                className="writeInput writeText"
                placeholder="Tell your story... *"
                type="text"
                id="desc"
                onChange={onChange}
                style={{border:"1px solid peru","borderRadius":"10px"}}

              />
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
        </div>
      )
}

export default UploadForum
