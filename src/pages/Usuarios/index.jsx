import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

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
  IcoMdPersonnName,
  MdOutlineEmail,
  MdContactPage,
  MdOutlineLockOpen,
} from 'react-icons/md';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export function Usuarios() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, 'Users');

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
                      ></Button>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
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
                  <IcoMdPersonnName />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <h1>Email:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <h1>CPF:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdContactPage />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <h1>senha:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineLockOpen />
                </InputLeftElement>
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
