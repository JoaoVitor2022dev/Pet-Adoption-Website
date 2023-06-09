// link do react router
import { Link } from "react-router-dom";

// image logo 
import Logo from "../../assets/img/logo.png";

// modules de styles do componente navbar
import styles from "../layout/Navbar.module.css"; 

// context 
import { Context } from "../../context/UserContext";
import { useContext } from "react";


const Navbar = () => {

  const {authenticated, logout} = useContext(Context); 

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img src={Logo} alt="Get A Pet" />
            <h2>Get A Pet</h2>
        </div>
        <ul>
            <li>
                <Link to="/">Adotar</Link>
            </li>
            { authenticated ? (
            <>
             <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>
               Sair  
            </li>
            </>):(
            <>
            <li>
               <Link to="/login">Entrar</Link>
            </li>
            <li>
               <Link to="/register">Cadastrar</Link>
            </li>
            </>
            ) }
        </ul>
    </nav>
  )
}

export default Navbar