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
  useClipboard,
  Flex,
  Input,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
} from "@chakra-ui/react";

type GetCouponCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modalContent?: {
    company: string;
    title: string;
    description: string;
    code: string;
    offerUrl: string;
    termsAndCond: string;
    logo: string;
  };
};
const defauiltModalContent = {
  company: "Columbia",
  title: "Columbia 15% Indirim",
  description:
    "lorem ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  termsAndCond:
    "Bu indirim lorem ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  code: "CLMBIA-21323-32",
  offerUrl:
    "https://www.columbia.com.tr/?gclid=CjwKCAiAmJGgBhAZEiwA1JZolmPjzw-57nWDPQwv7qy3FT88eY_XCkjM96X7JuRKTpG_NIxnbT6JGxoCtdEQAvD_BwE",
  logo: "https://logos-world.net/wp-content/uploads/2020/12/Columbia-Logo.png",
};

export function GetCouponCodeModal(props: GetCouponCodeModalProps) {
  const {
    isOpen,
    onClose,
    onOpen,
    modalContent = defauiltModalContent,
  } = props;
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    modalContent.code,
  );
  return (
    <>
      <Button onClick={onOpen}>Kampanyaya katıl</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>{modalContent.title}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={modalContent.logo} />
            <Text fontWeight="light" mb="1rem">
              {modalContent.description}
            </Text>
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Sartlar ve kosullar
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Flex gap={2}>
              <Input flex={4} value={value} />
              <Button flex={2} onClick={onCopy}>
                {hasCopied ? "Kopyalandi! ✅" : "Kopyala"}
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Kapat
            </Button>
            <Button
              colorScheme="green"
              onClick={() => window.open(modalContent.offerUrl)}
            >
              Kampanyaya git
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
