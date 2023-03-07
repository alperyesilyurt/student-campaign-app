import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type NotAuthenticatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export function NotAuthenticatedModal(props: NotAuthenticatedModalProps) {
  const { isOpen, onClose, onOpen } = props;
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={onOpen}>Kampanyaya katıl</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Giriş yapın / Kayıt olun</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="light" mb="1rem">
              Kampanyaları görmek için giriş yapın veya kayıt olun.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Kapat
            </Button>
            <Button colorScheme="green" onClick={() => navigate("/auth/login")}>
              Giriş yap
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
