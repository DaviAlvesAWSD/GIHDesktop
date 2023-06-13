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

export function Insumos() {
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

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const cancelRef = useRef();

  const [insumoSelecionado, setInsumoSelecionado] = useState(null);
  const [insumos, setInsumos] = useState([]);
  const [novoInsumo, setNovoInsumo] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
  });

  const selecionarInsumo = (insumo) => {
    setInsumoSelecionado(insumo);
    onOpen();
  };

  const insumoCollectionRef = collection(db, 'Insumo');

  async function deleteInsumo(id) {
    const userDoc = doc(db, 'Insumo', id);
    await deleteDoc(userDoc);
    closeAlert();
    toast({
      description: 'Usuario deletado com sucesso!!',
    });

    await window.location.reload();
  }

  async function editInsumo(id) {
    try {
      const userDoc = doc(db, 'Insumo', id);
      await updateDoc(userDoc, insumoSelecionado);
      console.log('Documento atualizado com sucesso');
      toast({
        description: 'Insumo editado com sucesso!!',
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar o documento:', error);
      toast({
        title: 'Error!!',
        description: 'Erro ao editar insumo!!',
        status: 'error',
      });
      closeModal();
      window.location.reload();
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
    const getInsumo = async () => {
      const data = await getDocs(insumoCollectionRef);
      setInsumos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInsumo();
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.tittle}>Insumos</h1>
      <TableContainer className={styles.table}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>nome</Th>
              <Th>quantidade</Th>
              <Th>tipo</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {getDataForCurrentPage(insumos).map((insumo) => {
              return (
                <>
                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Alterar insumo</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <div>
                          {insumoSelecionado && (
                            <>
                              <h1>Nome:</h1>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <MdPerson className={styles.iconInput} />
                                </InputLeftElement>
                                <Input
                                  type="text"
                                  placeholder="Nome"
                                  value={insumoSelecionado.nome}
                                  onChange={(e) =>
                                    setInsumoSelecionado({
                                      ...insumoSelecionado,
                                      nome: e.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                              {
                                <>
                                  <h1>Quantidade:</h1>
                                  <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                      <MdOutlineEmail
                                        className={styles.iconInput}
                                      />
                                    </InputLeftElement>
                                    <Input
                                      type="number"
                                      placeholder="Quantidade"
                                      value={insumoSelecionado.quantidade}
                                      onChange={(e) =>
                                        setInsumoSelecionado({
                                          ...insumoSelecionado,
                                          quantidade: e.target.value,
                                        })
                                      }
                                    />
                                  </InputGroup>
                                </>
                              }

                              <h1>Tipo</h1>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <MdContactPage className={styles.iconInput} />
                                </InputLeftElement>
                                <Input
                                  type="text"
                                  placeholder="Tipo"
                                  value={insumoSelecionado.tipo}
                                  onChange={(e) =>
                                    setInsumoSelecionado({
                                      ...insumoSelecionado,
                                      tipo: e.target.value,
                                    })
                                  }
                                />
                              </InputGroup>
                            </>
                          )}
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={() => editInsumo(insumoSelecionado.id)}
                          colorScheme="blue"
                          mr={3}
                        >
                          Salvar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <AlertDialog
                    isOpen={isOpenAlert}
                    leastDestructiveRef={cancelRef}
                    onClose={closeAlert}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Deletar insumo
                        </AlertDialogHeader>

                        <AlertDialogBody>você tem certeza?</AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={closeAlert}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => deleteInsumo(insumo.id)}
                            colorScheme="red"
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <Tr>
                    <Td>{insumo.nome}</Td>
                    <Td>{insumo.quantidade}</Td>
                    <Td>{insumo.tipo}</Td>
                    <Td>
                      <Button
                        className={styles.editBtn}
                        leftIcon={<EditIcon className={styles.icon} />}
                        colorScheme="teal"
                        variant="solid"
                        size="sm"
                        onClick={() => selecionarInsumo(insumo)}
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
        Página {currentPage} de {Math.ceil(insumos.length / itemsPerPage)}
      </Text>
      <Button
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        isDisabled={currentPage === Math.ceil(insumos.length / itemsPerPage)}
      >
        Próxima
      </Button>
    </div>
  );
}
