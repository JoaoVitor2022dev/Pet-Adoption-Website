// hook 
import { useState, useContext } from "react";

// componente de inputs 
import Input from "../../form/Input"; 

// styles geral 
import styles from "../../form/Form.module.css";

// react router dom 
import { Link } from "react-router-dom";

// context api 
import { Context } from "../../../context/UserContext";

const Register = () => {

  const [user, setUser] = useState({});   

  const { register } = useContext(Context);

  // function de envio de dados 
  const handleOnChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value}); 
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    // enviar o usuario para o banco
    
    register(user)

    // 1 - criar hook 
    // 2 - context 
  }

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
        <form onSubmit={handleSubmit}>
        <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome"  handleOnChange={handleOnChange}/>
        <Input text="Telefone" type="phone" name="phone" placeholder="Digite o seu telefone"  handleOnChange={handleOnChange}/>
        <Input text="email" type="email" name="email" placeholder="Digite o seu E-mail"  handleOnChange={handleOnChange}/>
        <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha"  handleOnChange={handleOnChange}/>
        <Input text="Confirmação senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha"  handleOnChange={handleOnChange}/>
        <input type="submit" value="Cadastrar"/>
        </form>
        <p>
          Já tem conta? <Link to="/login">Clique aqui.</Link>
        </p>
    </section>
  )
}

export default Register