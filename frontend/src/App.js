import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom"; 

// pages
import Home from "../src/components/Home"; 
import Login from "../src/components/pages/auth/Login";
import Register from "../src/components/pages/auth/Register";


function App() {
  return (
     <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
       </Routes>
     </BrowserRouter>
  );
}

export default App;
 