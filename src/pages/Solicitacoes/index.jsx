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

export function Solicitacoes() {
  const [selectedSolicitacaoId, setSelectedSolicitacaoId] = useState(null);

  // Restante do código...

  const handleOpenAlert = (id) => {
    setSelectedSolicitacaoId(id);
    openAlert();
  };

  async function editSolicInsumoAprovado(id) {
    try {
      const solicitacaoDoc = doc(db, 'SolicitacaoInsumo', id);
      await updateDoc(solicitacaoDoc, { status: 1 });
      toast({
        description: 'Solicitação Aprovada',
      });
      closeModal();
    } catch (error) {
      console.error('Erro ao aprovar solicitação:', error);
      toast({
        title: 'Error!!',
        description: 'Erro ao aprovar solicitação!!',
        status: 'error',
      });
      closeModal();
      window.location.reload();
    }
  }

  async function editSolicInsumoReprovado(id) {
    try {
      const solicitacaoDoc = doc(db, 'SolicitacaoInsumo', id);
      await updateDoc(solicitacaoDoc, { status: 2 });
      toast({
        description: 'Solicitação Reprovada',
      });
      closeModal();
    } catch (error) {
      console.error('Erro ao reprovar solicitação:', error);
      toast({
        title: 'Error!!',
        description: 'Erro ao reprovar solicitação!!',
        status: 'error',
      });
      closeModal();
      window.location.reload();
    }
  }

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

  const [solicitacaoInsumo, setSolicitacaoInsumo] = useState([]);

  const [status, setStatus] = useState(0);

  const solicitacaoInsumoCollectionRef = collection(db, 'SolicitacaoInsumo');

  async function updateStatus(id, newStatus) {
    try {
      const solicDocRef = doc(db, 'SolicitacaoInsumo', id);
      await updateDoc(solicDocRef, { status: newStatus });
      toast({
        description: `Status da solicitação atualizado para ${newStatus}`,
      });
    } catch (error) {
      console.error('Erro ao atualizar status da solicitação:', error);
      toast({
        title: 'Erro!',
        description: 'Erro ao atualizar status da solicitação!',
        status: 'error',
      });
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
    const getSolicitacao = async () => {
      const data = await getDocs(solicitacaoInsumoCollectionRef);
      setSolicitacaoInsumo(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getSolicitacao();
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.tittle}>Solicitações</h1>
      <TableContainer className={styles.table}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Descricao</Th>
              <Th>Paciente</Th>
              <Th>Quantidade</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {getDataForCurrentPage(solicitacaoInsumo).map((solicitacao) => {
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
                          Solicitação
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          deseja aprovar ou reprovar a solicitação?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button
                            colorScheme="blue"
                            ref={cancelRef}
                            onClick={() =>
                              editSolicInsumoAprovado(selectedSolicitacaoId)
                            }
                          >
                            Aprovar
                          </Button>
                          <Button
                            onClick={() =>
                              editSolicInsumoReprovado(selectedSolicitacaoId)
                            }
                            colorScheme="red"
                            ml={3}
                          >
                            Reprovar
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <Tr>
                    <Td>{solicitacao.descricao}</Td>
                    <Td>{solicitacao.paciente}</Td>
                    <Td>{solicitacao.quantidade}</Td>
                    <Td>
                      {solicitacao.status === 0 && (
                        <div
                          className={`${styles['status-ball']} ${styles.gray}`}
                        ></div>
                      )}
                      {solicitacao.status === 1 && (
                        <div
                          className={`${styles['status-ball']} ${styles.green}`}
                        ></div>
                      )}
                      {solicitacao.status === 2 && (
                        <div
                          className={`${styles['status-ball']} ${styles.red}`}
                        ></div>
                      )}
                    </Td>
                    <Td>
                      <Button
                        className={styles.editBtn}
                        leftIcon={<EditIcon className={styles.icon} />}
                        colorScheme="teal"
                        variant="solid"
                        size="sm"
                        onClick={() => handleOpenAlert(solicitacao.id)}
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
        Página {currentPage} de{' '}
        {Math.ceil(solicitacaoInsumo.length / itemsPerPage)}
      </Text>
      <Button
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        isDisabled={
          currentPage === Math.ceil(solicitacaoInsumo.length / itemsPerPage)
        }
      >
        Próxima
      </Button>
    </div>
  );
}
