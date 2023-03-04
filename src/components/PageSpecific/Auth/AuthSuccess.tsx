import { useWindowSize } from "@/common/hooks/use-windowsize";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Heading, Button, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

export const AuthSuccessResult = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  return (
    <Box w={"3xl"}>
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.3, x: -200 }}
        transition={{ duration: 0.5 }}
      >
        <ReactConfetti width={width} height={height} />
        <Box textAlign="center" py={2} px={2} maxW={"3xl"}>
          <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
          <Heading as="h2" size="lg" mt={2} mb={2}>
            Aramıza hoşgeldin! 🎉
          </Heading>
          <Text color={"gray.500"}>
            Kampanyaları keşfet ve kullanmaya başla. Hayata dair fikirlerini
            paylaş.
            <br />
            İşletmelerle iletişime geç.
          </Text>{" "}
          <Button mt={5} onClick={() => navigate("/dashboard/student/home")}>
            Kampanyaları keşfet 🚀
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};
