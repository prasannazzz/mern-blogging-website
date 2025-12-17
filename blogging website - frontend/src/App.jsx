import Navbar from "./components/navbar.component.jsx"; 
import { Routes, Route } from "react-router-dom";
const App = () => {
    return (
        // <Navbar />
        <Routes>    
            <Route path="/" element={<Navbar/>}>
            {/* <Route path="/signin" element={<h1>SignIn Page</h1>}></Route>
            <Route path="/signup" element={<h1>SignUp Page</h1>}></Route> */}
            <Route path="signin" element={<h1>SignIn Page</h1>}/>
            <Route path="signup" element={<h1>SignUp Page</h1>}/>
            </Route>
        </Routes>
    );
}

export default App;