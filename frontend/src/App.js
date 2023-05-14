import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom"; 

// componentes navbar e footer
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";

// pages
import Home from "../src/components/Home"; 
import Login from "../src/components/pages/auth/Login";
import Register from "../src/components/pages/auth/Register";

function App() {
  return (
     <BrowserRouter>
      <Navbar/>
      <Container>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
       </Routes>
      </Container>
       <Footer/>
     </BrowserRouter>
  );
}

export default App;
 