import React, {useState} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
toast.configure()

function AdminSignup() {
    const [user, setUserState] = useState({firstName:'',email:'',lastName:'',mobile:'',password:'',role:'admin',userPrivilegeId:1});
    const [loading,setloading] =useState(false);
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
        Axios.post(`${process.env.React_App_Api_Url}/api/user/signup`,{user}).then(res=>{
            toast.success('New admin account created successfully');
            setloading(false);
        }).catch(err=>{
            setloading(false);
            toast.error('Something went wrong. Please try later.');
        })
    }
    function onChange(e)
    {
        const newUser = {...user};
        if(e.target.id=='firstName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='lastName')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='email')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='mobile')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id=='password')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);

    }
    return (
        <div>
        {loading?<div class="loading"></div>:''} 
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3>Signup</h3>
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
                                    <input className="input"  type="text" name="fname" id="firstName" onChange={onChange}/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span> Last Name</span>
                                    <input className="input" type="text" name="lname" id="lastName" onChange={onChange}/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" type="email" name="email" id="email" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Mobile</span>
                                    <input className="input" type="number" name="mobile" id="mobile" onChange={onChange}/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Password</span>
                                        <input className="input" type="password" name="password" id="password" onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Confrim Password</span>
                                        <input className="input" type="password" name="confirmPassword" onChange={onChange}/>
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
        </div>
    )
}

export default AdminSignup
