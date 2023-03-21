import { trimString } from "@/common/utils/utils";
import { logoutThunk } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

function CurrentUserAvatar({}: Props) {
  const textColor = useColorModeValue("navy.700", "white");
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Box>
        <Text color={textColor} fontSize="md" fontWeight="700">
          Giriş yap
        </Text>
      </Box>
    );
  }

  return (
    <VStack mt="75px" mb="56px">
      <Flex justifyContent="center" alignItems="center" overflow={"hidden"}>
        <Avatar h="48px" w="48px" me="20px" name={user.name} />
        <Box>
          <Text color={textColor} fontSize="md" fontWeight="700">
            {user?.name} {user?.surname}
          </Text>
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="400">
            {trimString(user?.email, 20)}
          </Text>
        </Box>
      </Flex>
      <Button
        onClick={() => {
          dispatch(logoutThunk());
        }}
      >
        Logout
      </Button>
    </VStack>
  );
}

export default CurrentUserAvatar;
