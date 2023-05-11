// modules de styles do componente navbar
import styles from "../layout/Footer.module.css"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p><span className="bold">Get A Pet</span> &copy; 2023</p>
    </footer>
  )
}

export default Footer