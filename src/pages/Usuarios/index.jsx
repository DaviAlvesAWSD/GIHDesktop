import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useEffect, useState, useRef } from 'react';

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

// @ts-ignore
import { db } from '../../services/FirebaseConfig';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

// @ts-ignore
import logoLogin from '../../assets/imagem/logo.png';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { DeleteIcon, AddIcon, EditIcon, PhoneIcon } from '@chakra-ui/icons';

import {
  MdPerson,
  MdOutlineEmail,
  MdContactPage,
  MdOutlineLockOpen,
} from 'react-icons/md';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export function Usuarios() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const openAlert = () => {
    setIsOpenAlert(true);
  };

  const closeAlert = () => {
    setIsOpenAlert(false);
  };

  const cancelRef = useRef();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, 'Users');

  async const criarDado = () =>{
    try {
      const user = await addDoc(usersCollectionRef, {
        nome,
        email,
        senha,
        cpf,});

      console.log('dados salvos com sucessos', user);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.tittle}>Usuarios</h1>
      <Button
        className={styles.addButton}
        rightIcon={<AddIcon className={styles.icon} />}
        variant="solid"
        size="sm"
        onClick={onOpen}
      >
        novo usuario
      </Button>
      <TableContainer className={styles.table}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>CPF</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <>
                  <Tr>
                    <Td>{user.nome}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.cpf}</Td>
                    <Td>
                      <Button
                        className={styles.editBtn}
                        leftIcon={<EditIcon className={styles.icon} />}
                        colorScheme="teal"
                        variant="solid"
                        size="sm"
                      ></Button>
                      <Button
                        className={styles.deleteBtn}
                        leftIcon={<DeleteIcon className={styles.icon} />}
                        colorScheme="red"
                        variant="solid"
                        size="sm"
                        onClick={openAlert}
                      ></Button>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar usuario
            </AlertDialogHeader>

            <AlertDialogBody>
              você tem certeza? você não podera recuperar o usuario após
              executar essa ação.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar novo usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <h1>Nome:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPerson className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </InputGroup>
              <h1>Email:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <h1>CPF:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdContactPage className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="CPF"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </InputGroup>
              <h1>senha:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineLockOpen className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </InputGroup>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={criarDado()} colorScheme="blue" mr={3}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
