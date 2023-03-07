/*eslint-disable*/

import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");
  let linkColor = useColorModeValue({ base: "gray.400", lg: "white" }, "white");
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px={{ base: "30px", md: "0px" }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}
      >
        {" "}
        &copy; {1900 + new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          Unilifeapp. All Rights Reserved. Made with love by
          <Link
            mx="3px"
            color={textColor}
            href="https://www.unilifeapp.com"
            target="_blank"
            fontWeight="700"
          >
            Unilife
          </Link>
        </Text>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="mailto:hello@simmmple.com"
          >
            Destek
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://www.unilifeapp.com/licenses"
          >
            Lisans
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://unilifeapp.com/terms-of-service"
          >
            Kullanım Koşulları
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://www.blog.unilifeapp.com/"
          >
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
