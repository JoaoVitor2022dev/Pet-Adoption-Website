// componentes de react router DOM
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom"; 

// Context API
import { UserProvider } from "./context/UserContext";

// componentes navbar e footer
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";

// flash message
import Message from "./components/layout/Message";

// pages
import Home from "../src/components/Home"; 
import Login from "../src/components/pages/auth/Login";
import Register from "../src/components/pages/auth/Register";


function App() {
  return (
     <UserProvider>
        <BrowserRouter>
          <Navbar/>
          <Container>
          <Message/>  
           <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/register" element={<Register/>}/>
             <Route path="/login" element={<Login/>}/>
          </Routes>
          </Container>
          <Footer/>
       </BrowserRouter>
     </UserProvider>
  );
}

export default App;
 