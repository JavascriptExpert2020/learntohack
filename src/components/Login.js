import React,{ useState } from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

toast.configure()

function LoginComp (){
    const [user, setUserState] = useState({email:'',password:''});
    const [showPassword,setShowPassword] =useState(false);
    const [loading,setloading] =useState(false);
    const [showProfile,setShowProfile] =useState(localStorage.getItem('blogUser')?true:false);
    const [userProfile, setUserProfile] = useState(showProfile?JSON.parse(localStorage.getItem('blogUser')):'');
    const history = useHistory();
    const login = () =>
    {
        // ${process.env.React_App_Api_Url}
        // ${process.env.React_App_Api_Url}
        setloading(true);
        Axios.post(`${process.env.React_App_Api_Url}/api/user/login`,{email:user.email,password:user.password}).then(res=>{
            localStorage.setItem("blogUserToken",res.data.token);
            localStorage.setItem("blogUser",JSON.stringify(res.data.user));
            if(res.data.user.role==="admin")
            {
                history.replace("/verifyblogs");
                window.location.reload();
                setloading(false);
            }
            else{
                history.replace("/");
                window.location.reload();
                setloading(false);
            }
            setShowProfile(true);
            setUserProfile(res.data.user);
            setUserState({email:'',password:''});
        }).catch(err=>{
            toast.error(`${err.response.data.message}`);
            setloading(false);
        })

    }
    const UpdateProfile = (e,id) =>
    {
        e.preventDefault();
        // http://172.16.17.149:3001
        setloading(true);
        Axios.put(`${process.env.React_App_Api_Url}/api/user/${id}`,
        {
            firstName:userProfile.firstName,
            lastName:userProfile.lastName,
            mobile:userProfile.mobile,
            email:userProfile.email,
            role:'customer',
            id:userProfile.id}).then(res=>{
            //localStorage.setItem("blogUserToken",res.data.token);
            localStorage.setItem("blogUser",JSON.stringify(res.data.user));
            window.location.reload();
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error(`${err.response.data.message}`);
        })

    }
    function componentDidMount(e) {
        e.preventDefault();
    //    ${process.env.React_App_Api_Url}
        login();
    }
    function updateUser(e) {
        e.preventDefault();
        UpdateProfile(e,userProfile.id);
    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id=='email')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='password')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);
    }
    function onUpdateUser(e)
    {
        const newUserProfile = {...userProfile};
        newUserProfile[e.target.id] = e.target.value
        setUserProfile(newUserProfile);
        console.log(setUserProfile);
    }
    return (
        <div>
       {loading?<div class="loading"></div>:''} 
        { showProfile  
            ? 
            <>
            {/*<div className="page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <ul className="page-header-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Edit Profile</li>
                        </ul>
                        <h1>User Profile</h1>
                    </div>
                </div>
            </div>
        </div>*/}
    
            <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3>User Profile</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <ul className="list-style">
                            <li><p><strong>Email:</strong> <a href="#">Webmag@blog.com</a></p></li>
                            <li><p><strong>Phone:</strong> 213-520-7376</p></li>
                            <li><p><strong>Address:</strong> 3770 Oliver Street</p></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>User Profile</h3>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>First Name</span>
                                        <input className="input" type="text" name="subject" id="firstName"  value={userProfile.firstName} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Last Name</span>
                                        <input className="input" type="text" name="subject" id="lastName"  value={userProfile.lastName} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" value={userProfile.email} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Mobile</span>
                                        <input className="input" type="number" name="email" id="mobile" value={userProfile.mobile} onChange={onUpdateUser}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button onClick={e=>{updateUser(e)}} className="primary-button">Update</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
            : 
            <>
            {/*<div className="page-header" >
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <ul className="page-header-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Login</li>
                        </ul>
                        <h1>Login</h1>
                    </div>
                </div>
            </div>
        </div>*/}
            <div className="section" >
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row" style={{"marginTop":"10%"}}>
                        <h3 >Login</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <ul className="list-style">
                            <li><p><strong>Email:</strong> <a href="#">Webmag@email.com</a></p></li>
                            <li><p><strong>Phone:</strong> 213-520-7376</p></li>
                            <li><p><strong>Address:</strong> 3770 Oliver Street</p></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="section-row">
                        <h3>Login Information</h3>
                            <div className="row">
                            <form onSubmit={componentDidMount}>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" type={showPassword?"text":"password"} name="subject" id="password" onChange={onChange} required/>
                                        {!showPassword?(<i className="fa fa-eye-slash mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>):
                (<i className="fa fa-eye mr-3" onClick={(e)=>{setShowPassword(!showPassword)}}></i>)}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="primary-button">Submit</button>
                                </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}
        </div>
    )
}

export default LoginComp
