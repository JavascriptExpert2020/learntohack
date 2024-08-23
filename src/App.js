import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Header from './components/header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Write from "./pages/WriteBlog";
import Posts from "./pages/Posts";
import Blogdetails from './components/Blog-details';
import WriteForum from "./pages/WriteForum";
import AllForum from "./pages/AllForum";
import ForumDetails from "./components/ForumDetails";
import Myblogs from "./components/Myblogs";
import Admin from "./components/Admin";
import VerifyBlogs from "./components/VerifyBlogs";
import VerifyForums from "./components/VerifyForums";
import AdminSignup from "./components/AdminSignup";
import { Carousel } from "react-responsive-carousel";
import Myforums from "./components/Myforums";
import Contactus from "./pages/Contactus";
import Admincontactus from "./components/Admincontactus";
function App() {
  return (
    <>
    <Router>
      <Header ></Header>
     
        <Switch>
      
          <Route exact path="/about">
            <AboutUs></AboutUs>
          </Route>

          <Route exact path="/signup">
            <Signup></Signup>
          </Route>

          <Route exact path="/login" >
            <Login ></Login>
          </Route>

        <Route exact path="/allblog/:tag">
          <Posts></Posts>
        </Route>
        <Route exact path="/allblog/search/:search">
        <Posts></Posts>
      </Route>
        <Route exact path="/allblog">
          <Posts></Posts>
        </Route>
        <Route exact path="/contactus">
          <Contactus></Contactus>
        </Route>
        <Route exact path="/admincontactus">
        <Admincontactus></Admincontactus>
      </Route>
        <Route exact path="/uploadblog">
          <Write></Write>
        </Route>

        <Route exact path="/post/:id">
          <Blogdetails ></Blogdetails>
         </Route>

         <Route exact path="/forum">
            <WriteForum></WriteForum>
        </Route>
        <Route exact path="/forum/:id">
            <ForumDetails></ForumDetails>
       </Route>
        <Route exact path="/allforum">
           <AllForum></AllForum>
        </Route>
        <Route exact path="/myblogs">
            <Myblogs></Myblogs>
         </Route>
         <Route exact path="/myforums">
              <Myforums></Myforums>
         </Route>
         <Route exact path="/admin">
              <Admin></Admin>
          </Route>
          <Route exact path="/adminsignup">
            <AdminSignup></AdminSignup>
          </Route>
          <Route exact path="/verifyblogs">
            <VerifyBlogs></VerifyBlogs>
          </Route>
          <Route exact path="/verifyforums">
            <VerifyForums></VerifyForums>
        </Route>
          <Route exact path="/" >
            <Home></Home>
          </Route>
    
        </Switch>
      <Footer></Footer>
    </Router>
    
    </>
  );
}

export default App;