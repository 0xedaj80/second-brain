import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
   return (
    <BrowserRouter>
    <Routes>
      <Route path="/Signup" element={<Signup></Signup>}></Route> 
      <Route path="/Signin" element={<Signin></Signin>}></Route> 
      <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>  
      </Routes>    
    </BrowserRouter>

   )
}

export default App