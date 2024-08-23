import React, {useState} from 'react'
import Axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
toast.configure()

function ContactUs() {
    const [user, setUserState] = useState({name:'',company_name:'',email:'',mobile:'',message:''});
    const [loading,setloading] =useState(false);
    const history = useHistory();
    function componentDidMount(e) {
        e.preventDefault();
        setloading(true);
        if(user.mobile.length>8)
        {
            if(user.message.length>20)
            {
                    Axios.post(`${process.env.React_App_Api_Url}/api/contactus/create_contact_us`,{
                        email:user.email,
                        name:user.name,
                        company_name:'null',
                        reason:user.reason,
                        message:user.message,
                        mobile:user.mobile,
                    }).then(res=>{
                        toast.success('Your Contact Us has been successfully created. Our team member will contact you shortly.');
                        setloading(false);
                        history.replace("/");
                        window.location.reload();
                    }).catch(err=>{
                        toast.error(`${err.response.data.message}`);
                        setloading(false);
                    })
                
            }
            else{
                toast.error('Message length should be greater than 20 words.');
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
        if(e.target.id==='name')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='company_name')
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
        if(e.target.id==='reason')
        {
            newUser[e.target.id] = e.target.value
        }
        if(e.target.id==='message')
        {
            newUser[e.target.id] = e.target.value
        }
        setUserState(newUser);

    }
    return (
        <div>
        {loading?<div className="loading"></div>:''} 
        {/*<div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <ul className="page-header-breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li>Contact</li>
                    </ul>
                    <h1>Contact</h1>
                </div>
            </div>
        </div>
    </div>*/}
        <div className="section">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="section-row">
                        <h3 >Contact Information</h3>
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
                        <h3>Send A Message </h3>
                        <form onSubmit={(e)=>{componentDidMount(e)}}>
                            <div className="row">
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Name</span>
                                    <input className="input" autoComplete="off" type="text" name="fname" id="name" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Email</span>
                                        <input className="input" autoComplete="off" type="email" name="email" id="email" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                <div className="form-group">
                                    <span>Mobile</span>
                                    <input className="input" autoComplete="off" type="number" name="mobile" id="mobile" onChange={onChange} required/>
                                </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <span>Subject</span>
                                        <input className="input" autoComplete="off" type="text" name="password" id="reason" onChange={onChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <span>Message</span>
										<div class="form-group">
											<textarea class="input" name="message" placeholder="Message" id="message" onChange={onChange} required></textarea>
										</div>
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

export default ContactUs
