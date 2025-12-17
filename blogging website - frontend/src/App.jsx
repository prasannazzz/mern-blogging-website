import Navbar from "./components/navbar.component.jsx"; 
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page.jsx";
const App = () => {
    return (
        // <Navbar />
        <Routes>    
            <Route path="/" element={<Navbar/>}>
            {/* <Route path="/signin" element={<h1>SignIn Page</h1>}></Route>
            <Route path="/signup" element={<h1>SignUp Page</h1>}></Route> */}
            {/* <Route path="signin" element={<h1>SignIn Page</h1>}/>
            <Route path="signup" element={<h1>SignUp Page</h1>}/> */}
            <Route path="signin" element={<UserAuthForm type="sign-in"/>}/>
            <Route path="signup" element={<UserAuthForm type="sign-up"/>}/>
            </Route>
        </Routes>
    );
}

export default App;