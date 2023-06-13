import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/react';

import { useEffect, useState, useRef } from 'react';

import { useToast } from '@chakra-ui/react';

// @ts-ignore
import { auth } from '../../services/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
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

import { Button, ButtonGroup, Text } from '@chakra-ui/react';
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

import MaskedInput from 'react-text-mask';

import InputMask from 'react-input-mask';

export function Usuarios() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Defina o número de itens por página conforme necessário

  const getDataForCurrentPage = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const openAlert = () => {
    setIsOpenAlert(true);
  };

  const closeAlert = () => {
    setIsOpenAlert(false);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const abrirModalEdicao = (usuario) => {
    setUsuarioSelecionado(usuario);
    setIsOpenModal(true);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const cancelRef = useRef();

  const [users, setUsers] = useState([]);
  const [novoUser, setNovoUser] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
  });

  const usersCollectionRef = collection(db, 'Users');

  function formatarCPF(cpf) {
    if (cpf) {
      // Remove qualquer caractere que não seja número
      cpf = cpf.replace(/\D/g, '');

      // Remove pontos e traços
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1$2$3$4');

      // Aplica a máscara
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
  }

  function createUser() {
    console.log(nome, email, senha, cpf);
  }

  const registrarUsuario = async () => {
    try {
      // Salva o estado atual do usuário autenticado (se houver)
      const currentUser = auth.currentUser;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        novoUser.email,
        novoUser.senha
      );

      const user = userCredential.user;

      // Atualize o perfil do usuário com os dados necessários
      await updateProfile(auth.currentUser, {
        displayName: novoUser.nome,
        // outras informações do perfil que você desejar
      });

      console.log('Usuário criado com sucesso:', user);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  };

  const criarUser = async () => {
    try {
      const docRef = await addDoc(usersCollectionRef, novoUser);
      toast({
        description: 'Usuario criado com sucesso!!',
      });
      registrarUsuario();
    } catch (error) {
      console.error('Erro ao salvar a nova coleção:', error);
      toast({
        title: 'Error!!',
        description: 'Erro ao inserir usuario!!',
        status: 'error',
      });
    }
  };

  async function deleteUser(id) {
    const userDoc = doc(db, 'Users', id);
    await deleteDoc(userDoc);
    closeAlert();
    toast({
      description: 'Usuario deletado com sucesso!!',
    });

    await window.location.reload();
  }

  async function editUser(id) {
    try {
      const userDoc = doc(db, 'Users', id);
      await updateDoc(userDoc, usuarioSelecionado);
      console.log('Documento atualizado com sucesso');
      toast({
        description: 'Usuario editado com sucesso!!',
      });
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar o documento:', error);
      toast({
        title: 'Error!!',
        description: 'Erro ao editar usuario!!',
        status: 'error',
      });
      closeModal();
    }
  }

  const toast = useToast({
    position: 'top',
    title: 'Sucesso!!',
    status: 'success',
    duration: 9000,
    isClosable: true,
  });

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
            {getDataForCurrentPage(users).map((user) => {
              return (
                <>
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
                          você tem certeza? você não podera recuperar o usuario
                          após executar essa ação.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={closeAlert}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => deleteUser(user.id)}
                            colorScheme="red"
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <Modal blockScrollOnMount={false} isOpen={isOpenModal}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Editar dados do usuario</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <div>
                          <h1>Nome:</h1>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <MdPerson className={styles.iconInput} />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder="Nome"
                              value={usuarioSelecionado?.nome || ''}
                              onChange={(e) =>
                                setUsuarioSelecionado({
                                  ...usuarioSelecionado,
                                  nome: e.target.value,
                                })
                              }
                            />
                          </InputGroup>
                          <h1>Email:</h1>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <MdOutlineEmail className={styles.iconInput} />
                            </InputLeftElement>
                            <Input
                              type="text"
                              value={usuarioSelecionado?.email || ''}
                              placeholder="Email"
                              onChange={(e) =>
                                setUsuarioSelecionado({
                                  ...usuarioSelecionado,
                                  email: e.target.value,
                                })
                              }
                            />
                          </InputGroup>
                          <h1>CPF:</h1>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <MdContactPage className={styles.iconInput} />
                            </InputLeftElement>
                            <Input
                              type="text"
                              value={formatarCPF(usuarioSelecionado?.cpf) || ''}
                              placeholder="CPF"
                              onChange={(e) => {
                                const inputCPF = e.target.value
                                  .replace(/\D/g, '')
                                  .slice(0, 11); // Remove caracteres não numéricos

                                setUsuarioSelecionado({
                                  ...usuarioSelecionado,
                                  cpf: inputCPF,
                                });
                              }}
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
                              value={usuarioSelecionado?.senha || ''}
                              onChange={(e) =>
                                setUsuarioSelecionado({
                                  ...usuarioSelecionado,
                                  senha: e.target.value,
                                })
                              }
                            />
                          </InputGroup>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <Button ref={cancelRef} onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => editUser(usuarioSelecionado?.id)}
                          colorScheme="blue"
                          mr={3}
                        >
                          editar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
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
                        onClick={() => abrirModalEdicao(user)}
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
      <Button
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        isDisabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Text display="inline" mx={2}>
        Página {currentPage} de {Math.ceil(users.length / itemsPerPage)}
      </Text>
      <Button
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        isDisabled={currentPage === Math.ceil(users.length / itemsPerPage)}
      >
        Próxima
      </Button>
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
                  type="text"
                  placeholder="Nome"
                  onChange={(e) =>
                    setNovoUser({ ...novoUser, nome: e.target.value })
                  }
                />
              </InputGroup>
              <h1>Email:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="text"
                  value={novoUser?.email || ''}
                  placeholder="Email"
                  onChange={(e) =>
                    setNovoUser({
                      ...novoUser,
                      email: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <h1>CPF:</h1>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdContactPage className={styles.iconInput} />
                </InputLeftElement>
                <Input
                  type="text"
                  value={formatarCPF(novoUser.cpf) || ''}
                  placeholder="CPF"
                  onChange={(e) =>
                    setNovoUser({
                      ...novoUser,
                      cpf: e.target.value.replace(/\D/g, '').slice(0, 11), // Remove caracteres não numéricos
                    })
                  }
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
                  onChange={(e) =>
                    setNovoUser({ ...novoUser, senha: e.target.value })
                  }
                />
              </InputGroup>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={criarUser} colorScheme="blue" mr={3}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
