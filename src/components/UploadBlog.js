import React,{useState} from 'react';
import './uploadblogcss/card.css';
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useHistory } from 'react-router-dom';

toast.configure()
function UploadBlog() {
  const [dataUri, setDataUri] = useState('')
  const [loading,setloading] =useState(false);
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const[user,setUser] = useState(JSON.parse(localStorage.getItem('blogUser')))
  const[blog,setBlog] = useState({desc:'',title:'',tag:''});
  const history = useHistory();
  const API_URL = `${process.env.React_App_Api_Url}/api/aws/file?email=${user.email}`;
 
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
             const formdata = new FormData();
                  formdata.append("file", file);
            Axios.post(`${API_URL}`,formdata)
            .then(res=>{
              console.log(res.data.url)
              resolve({
                default: res.data.url
              });
              }).catch(err=>{
                  console.log(err);
                })
                  
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
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
        setloading(false);
        console.log(err);
      })
  }
  function publishBlog(e)
  {
    e.preventDefault();
    let formData = new FormData();
     formData.append('file', dataUri);
     setloading(true)
     if(dataUri !== '' && text !== '' && blog.title !== '' && blog.tag !== '')
     {
        Axios.post(`${process.env.React_App_Api_Url}/api/blog/createblog`,{
          image:url,
          title:blog.title,
          text:text,
          userid:user.id,
          verified:false,
          tag:blog.tag
        }).then(res=>{
          toast.success('Blog uploaded successfully. Our Admin will verify it shortly.');
          setBlog({desc:'',title:'',tag:''});
          setDataUri('');
          setloading(false);
          history.replace("/myblogs");
        }).catch(err=>{
            console.log(err);
            setloading(false)
            toast.error('Something went wrong. Please try later.');
        })
     }
     else{
          setloading(false)
          toast.error('All feilds are required. Fill all feilds to publish blog.');
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
      < >
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
                <CKEditor
                editor={ClassicEditor}
                data={text}
                id="desc"
                config={{placeholder: "Tell your story...*"}}
                onChange={(event,editor)=>{
                  const data=editor.getData();
                  setText(data);      
                  console.log(text)          
                }}
                // config={{ removePlugins: ['MediaEmbed','EasyImage','ImageUpload']}} 
                config={{  extraPlugins: [uploadPlugin]}}
                >
              </CKEditor>
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
          </div>
      </>
    )
}

export default UploadBlog
