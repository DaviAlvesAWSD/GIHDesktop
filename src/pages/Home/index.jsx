import styles from './styles.module.css';
import { FaBeer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Button, ButtonGroup } from '@chakra-ui/react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

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

//<img className={styles.logo} src={logoLogin} alt="" />

export function Home() {
  const navigate = useNavigate();

  const goToExit = () => {
    navigate('/');
  };

  const goToHome = () => {
    navigate('/Home');
  };

  const goToSolicitacoes = () => {
    navigate('/Home/Solicitacoes');
  };

  const goToUsuarios = () => {
    navigate('/Home/Usuarios');
  };

  const goToPerfil = () => {
    navigate('/Home/Perfil');
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<MdAccountCircle className={styles.inconLogin} />}
          >
            Davi Alves
          </MenuButton>
          <MenuList>
            <MenuItem onClick={goToPerfil}>Perfil</MenuItem>
            <MenuItem onClick={goToExit}>
              <MdExitToApp className={styles.incons} />
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
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
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
