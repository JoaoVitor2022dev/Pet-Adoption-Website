// hooks 
import { useState, useEffect } from "react"

// styles 
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";

// componentes de input 
import Input from "../../form/Input";

const Profile = () => {

    const [user, setUser ] = useState({}); 
 
    const onFileChange = (e) => {
       
    };

    const handleOnChange = (e) => {

    };

  return (
    <section>
        <div className={styles.profile_header}>
             <h1>Perfil</h1>
             <p>Preview Imagem</p>
        </div>
        <form className={formStyles.form_container}>
          <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
          />
         <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleOnChange}
          value={user.email || ''}
          />
         <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleOnChange}
          value={user.name || ''}
          />
        <Input
          text="Telefone"
          type="phone"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleOnChange}
          value={user.phone || ''}
          />
         <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleOnChange}
          />
         <Input
          text="confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirm a sua senha senha"
          handleOnChange={handleOnChange}
          />
          <input type="submit" value="Editar" />
        </form>
    </section>
  )
}

export default Profile