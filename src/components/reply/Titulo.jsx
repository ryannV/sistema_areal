import styles from './Titulo.module.css';
import logo from '../../assets/logo-areal-sf.png';
import userIcon from '../../assets/user-solid.svg'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useRef, useState } from 'react';

const Titulo = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  const handleClickFora = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuAberto(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.center}>
        <h1 className={styles.title}>Areal Ilha do Rio Doce</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.userMenu} ref={menuRef}>
          <img
            src={userIcon}
            alt="user"
            className={styles.userIcon}
            onClick={() => setMenuAberto(!menuAberto)}
          />
          {menuAberto && (
            <div className={styles.dropdown}>
              <button onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Titulo;