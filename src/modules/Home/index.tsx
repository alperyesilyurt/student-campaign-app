import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import AnimatedText from "../../components/animated/AnimatedText";
import "./styles.scss";
import {
  Button,
  Center,
  Container,
  Heading,
  Image,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { DefaultLayout } from "@/layouts";
import { CTA } from "@/components/PageSpecific/LandingPage/CTA";
import { Highlights } from "@/components/PageSpecific/LandingPage/Highlights";
import { useNavigate } from "react-router-dom";
import { IllustrationLanding } from "@/components/PageSpecific/LandingPage/IllustrationLanding";
import Testimonials from "@/components/PageSpecific/LandingPage/Testimonials";
import { fontFamilies } from "@/common/constants";

export default function Home() {
  const [replay, setReplay] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  // Placeholder text data, as if from API
  const navigation = useNavigate();

  const placeholderText = [
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Have a great university experience",
      },
    ],
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Enjoy your university life",
      },
    ],
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Tell your friends about us.🌈",
      },
    ],
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay);
    setTimeout(() => {
      setReplay(true);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReplay();
      if (textIndex === placeholderText.length - 1) {
        setTextIndex(0);
      } else {
        setTextIndex(textIndex + 1);
      }
    }, 6670);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <DefaultLayout>
      <Container maxW="container.lg">
        <Center p={4} minHeight="70vh">
          <VStack>
            <Flex w={"full"}>
              <IllustrationLanding
                height={{ sm: "24rem", lg: "20rem" }}
                mt={{ base: 12, sm: 16 }}
              />
            </Flex>
            <Container maxW="container.md" textAlign="center">
              <Heading
                fontFamily={fontFamilies.heading}
                size="2xl"
                mb={4}
                color="gray.700"
              >
                Application: where all discount opportunities for students are
                together
              </Heading>

              <Text fontSize="xl" color="gray.500">
                Freelancers use Biller to accept payments and send invoices to
                clients with a single click
              </Text>

              <Text my={2} fontSize="sm" color="gray.500">
                102+ builders have signed up in the last 30 days
              </Text>
              <Button
                mt={8}
                colorScheme="green"
                onClick={() => navigation("/campaigns")}
              >
                Lets see campaigns →
              </Button>
              <Button
                ml={2}
                mt={8}
                colorScheme="gray"
                onClick={() => navigation("/contact")}
              >
                See Events →
              </Button>
            </Container>
          </VStack>
        </Center>
      </Container>
      <div className="home-animation">
        <motion.div
          className={"App"}
          initial="hidden"
          animate={replay ? "visible" : "hidden"}
          variants={container}
        >
          <div className="container">
            {placeholderText[textIndex].map((item, index) => {
              return <AnimatedText {...item} key={index} />;
            })}
          </div>
        </motion.div>
        <motion.div>
          <Image
            w={"lg"}
            h={"sm"}
            borderRadius={"xl"}
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
          ></Image>
        </motion.div>
      </div>
      <Highlights />
      <Testimonials />
      <CTA
        cta={{ name: "Lets do it" }}
        heading={"Enjoy cheaper life in university"}
        key={44}
      />
    </DefaultLayout>
  );
}
