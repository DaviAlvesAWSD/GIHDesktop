import styles from './styles.module.css';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';

import { EmailIcon } from '@chakra-ui/icons';

// @ts-ignore
import logoLogin from '../../assets/imagem/logo.png';

export function Solicitacoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className={styles.content}>
      <span className={styles.textContent}> Em construção!</span>
      <Button
        leftIcon={<EmailIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      ></Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

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
