import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { auth } from '../../services/FirebaseConfig';
import { getFireStore } from 'firebase/firestore';

// @ts-ignore
import logoLogin from '../../assets/imagem/logo.png';

export function Usuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [users, setUsers] = useState([]);

  const db = getFireStore(auth);

  return (
    <div className={styles.content}>
      <span className={styles.textContent}> Em construção!</span>
    </div>
  );
}
