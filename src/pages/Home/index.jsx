import styles from './styles.module.css';
import { FaBeer } from 'react-icons/fa';
import { MdFormatListBulleted } from "react-icons/md";

// @ts-ignore
import MenuIcon from '../../assets/imagem/menuIcon.png';

export function Home(){
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
              <MdFormatListBulleted className={styles.menuIcon} />
            </div>
        </div>
    );
}