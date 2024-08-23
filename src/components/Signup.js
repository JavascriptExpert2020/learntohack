import React, {useState} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
toast.configure()
function SignupComp(e) {
    const [user, setUserState] = useState({firstName:'',email:'',lastName:'',mobile:'',password:'',role:'customer',userPrivilegeId:2,confirmpassword:''});
    const [loading,setloading] =useState(false);
    const history = useHistory();
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
        if(user.mobile.length>8)
        {
            if(user.password.length>8)
            {
                if(user.password  === user.confirmpassword)
                {
                    Axios.post(`${process.env.React_App_Api_Url}/api/user/signup`,{user}).then(res=>{
                        toast.success('Your account has been successfully created. Our admin will shortly approve your account.');
                        setloading(false);
                        history.replace("/login");
                    }).catch(err=>{
                        toast.error(`${err.response.data.message}`);
                        setloading(false);
                    })
                }
                else{
                    toast.error('Password and Confirm Password mismatch.');
                    setloading(false);
                }
            }
            else{
                toast.error('Password length should be greater than 8.');
                setloading(false);
            }
        }
        else{
            toast.error('Mobile number not valid.');
            setloading(false);
        }

    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id==='firstName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='lastName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='email')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='mobile')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='password')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='confirmpassword')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);

    }
    return (
        <div>
        {loading?<div class="loading"></div>:''} 
        <>
        {/*<div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <ul className="page-header-breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li>Signup</li>
                    </ul>
                    <h1>User Registeration</h1>
                </div>
            </div>
        </div>
    </div>*/}
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3>Register</h3>
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
                        <h3>Signup Information</h3>
                        <form onSubmit={(e)=>{componentDidMount(e)}}>
                            <div className="row">
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>First Name</span>
                                    <input autocomplete="off" className="input"  type="text" name="fname" id="firstName" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span> Last Name</span>
                                    <input className="input" autocomplete="off" type="text" name="lname" id="lastName" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" autocomplete="off" type="email" name="email" id="email" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Mobile</span>
                                    <input className="input" autocomplete="off" type="number" name="mobile" id="mobile" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" autocomplete="off" type="password" name="password" id="password" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Confrim Password</span>
                                        <input className="input" autocomplete="off" type="password" name="confirmPassword" onChange={onChange} id="confirmpassword" required/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="primary-button" >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>

        </div>
    )
}

export default SignupComp
