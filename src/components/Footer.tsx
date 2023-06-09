import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Link,
  Icon,
  Box,
  Divider,
} from "@chakra-ui/react";
import UniLifeLogo_2 from "./icons/UniLifeLogo_2";
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io";

type Props = {};

const discoverCampaigns = [
  {
    id: "1",
    title: "Popular Categories",
  },
  {
    id: "2",
    title: "Food",
  },
  {
    id: "3",
    title: "Fashion",
  },
  {
    id: "4",
    title: "Tech",
  },
  {
    id: "5",
    title: "Health",
  },
  {
    id: "6",
    title: "Sports",
  },
  {
    id: "7",
    title: "All",
  },
];

const supports = [
  {
    id: "1",
    title: "About UniLife",
  },
  {
    id: "2",
    title: "Contact",
  },
  {
    id: "3",
    title: "Follow us",
  },
];

const followUs = [
  {
    id: "1",
    icon: IoLogoFacebook,
    link: "",
  },
  {
    id: "2",
    icon: IoLogoYoutube,
    link: "",
  },
  {
    id: "3",
    icon: IoLogoInstagram,
    link: "",
  },
];

export default function Footer({}: Props) {
  return (
    <Box bg="black" color="white">
      <SimpleGrid
        p={{ base: "50px", md: "100px" }}
        minChildWidth="250px"
        w="100%"
        gap="80px"
      >
        <Flex direction="column" gap="20px">
          <UniLifeLogo_2 />
          <Text>Make your university life a lot cheaper and funnier</Text>
        </Flex>
        <Flex direction="column" gap="25px">
          <Heading size="md">Discover Campaigns</Heading>
          <Flex direction="column" gap="10px">
            {discoverCampaigns.map((item) => (
              <Text key={item.id}>{item.title}</Text>
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" gap="25px">
          <Heading size="md">Corporate</Heading>
          <Flex direction="column" gap="10px">
            {supports.map((item) => (
              <Text key={item.id}>{item.title}</Text>
            ))}
          </Flex>
          <Flex gap="10px" direction="column">
            <Text>Terms of Service</Text>
            <Text>Privacy Policy</Text>
            <Text>Cookie Policy</Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap="25px">
          <Heading size="md">Follow Us</Heading>
          <Flex gap="20px">
            {followUs.map((item) => {
              return (
                <Link href={item.link} key={item.id}>
                  <Icon as={item.icon} w="30px" h="30px" />
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </SimpleGrid>
      <Divider borderColor="whiteAlpha.600" borderWidth={1} />
      <Text color="white" p="20px 40px" align="center">
        © {new Date().getFullYear()} UniLife. All rights reserved.
      </Text>
    </Box>
  );
}
