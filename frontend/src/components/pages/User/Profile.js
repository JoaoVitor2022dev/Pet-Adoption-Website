// hooks 
import { useState, useEffect } from "react"

// styles 
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";

// componentes de input 
import Input from "../../form/Input";

// API REST 
import api from "../../../utils/api";

// mensagens 
import useFlashMessage from "../../../hooks/useFlashMessage"

const Profile = () => {

    const [user, setUser ] = useState({}); 
    
    // token 
    const [token] = useState(localStorage.getItem("token") || ''); 

    const { setFlasMessage } = useFlashMessage(); 

    useEffect(() => {
 
    api.get('/users/checkuser', {
       headers: {
         Authorization: `Bearer ${JSON.parse(token)}`
       }
    }).then((response) => {
        setUser(response.data)
    })     
 
    }, [token])
 
    const onFileChange = (e) => {
       setUser({...user, [e.target.name]: e.target.files[0]}); 
    };

    const handleOnChange = (e) => {
      setUser({...user, [e.target.name]: e.target.value}); 
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); 

      let msgType = "sucess"

      const formData = new FormData()

       await Object.keys(user).forEach((key) => { formData.append(key, user[key])})

      const data = await api.patch(`users/edit/${user._id}`, formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
          }
      }).then((response) => {
        return response.data

      }).catch((err) => {
        msgType = 'err'
        return err.response.data
      }
      ) 
    setFlasMessage(data.message, msgType);
    }

  return (
    <section>
        <div className={styles.profile_header}>
             <h1>Perfil</h1>
             <p>Preview Imagem</p>
        </div>
        <form onSubmit={handleSubmit} className={formStyles.form_container}>
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