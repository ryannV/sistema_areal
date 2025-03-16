import styles from './Input.module.css'

const Input = ({type, name, placeholder, htmlfor, label}) => {
    return(
        <div className={styles.campos}>
            <label style={{color: "#1a4f77"}} htmlFor={htmlfor}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

export default Input;