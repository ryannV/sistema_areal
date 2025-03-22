import styles from './Input.module.css';

const Input = ({ type, name, placeholder, htmlfor, label, value, onChange }) => {
    return (
        <div className={styles.campos}>
            <label style={{ color: "#1a4f77" }} htmlFor={htmlfor}>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                value={value}  // 🔹 Agora o input usa o valor do estado
                onChange={onChange} // 🔹 Agora as mudanças são repassadas
            />
        </div>
    );
};

export default Input;
