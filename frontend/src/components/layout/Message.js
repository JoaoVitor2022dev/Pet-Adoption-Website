// hook 
import { useEffect, useState} from "react"

// css
import styles from "../layout/Message.module.css"

const Message = () => {
 
    const [type, setType] = useState("");

  return (
    <div className={`${styles.message} ${styles[type]}`}>Minha mensagem</div>
  )
}

export default Message