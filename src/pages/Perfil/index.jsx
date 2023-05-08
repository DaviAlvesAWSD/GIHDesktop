import styles from './styles.module.css';
import { FaBeer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  MdFormatListBulleted,
  MdAccountCircle,
  MdAddHome,
  MdExitToApp,
  MdManageAccounts,
  MdPendingActions,
} from 'react-icons/md';

// @ts-ignore
import logoLogin from '../../assets/imagem/logo.png';

export function Perfil() {
  const navigate = useNavigate();

  const goToExit = () => {
    navigate('/');
  };

  const goToHome = () => {
    navigate('/Home');
  };

  const goToSolicitacoes = () => {
    navigate('/Solicitacoes');
  };

  const goToUsuarios = () => {
    navigate('/Usuarios');
  };

  const goToPerfil = () => {
    navigate('/Perfil');
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <div className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <img className={styles.logo} src={logoLogin} alt="" />
        </div>
        <div className={styles.sideContent}>
          <div className={styles.sidebarBtn} onClick={goToHome}>
            <p className={styles.sidebarBtnContent}>
              <MdAddHome className={styles.incons} /> Home
            </p>
          </div>
          <div className={styles.sidebarBtn}>
            <p className={styles.sidebarBtnContent}>
              <MdFormatListBulleted className={styles.incons} />
              Lista de insumos
            </p>
          </div>
          <div className={styles.sidebarBtn} onClick={goToSolicitacoes}>
            <p className={styles.sidebarBtnContent}>
              <MdPendingActions className={styles.incons} />
              Solicitações de insumos
            </p>
          </div>
          <div className={styles.sidebarBtn} onClick={goToUsuarios}>
            <p className={styles.sidebarBtnContent}>
              <MdManageAccounts className={styles.incons} />
              Usuários
            </p>
          </div>
          <div className={styles.sidebarBtn} onClick={goToPerfil}>
            <p className={styles.sidebarBtnContent}>
              <MdAccountCircle className={styles.incons} /> Perfil
            </p>
          </div>
          <div className={styles.sidebarBtn} onClick={goToExit}>
            <p className={styles.sidebarBtnContent}>
              <MdExitToApp className={styles.incons} />
              Sair
            </p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.textContent}> Em construção!</span>
      </div>
    </div>
  );
}
