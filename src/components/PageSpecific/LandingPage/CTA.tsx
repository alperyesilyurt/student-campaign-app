import { Button, Container, Text, VStack } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";

interface CTAProps {
  heading: string;
  cta: { name: string };
}

export const CTA: FunctionComponent<CTAProps> = ({
  heading,
  cta,
}: CTAProps) => {
  return (
    <Container maxW="container.lg" py={16}>
      <VStack
        spacing={6}
        backgroundColor="green.500"
        rounded="xl"
        p={6}
        backgroundImage="https://uploads-ssl.webflow.com/60c29c0c0d66236222bfa9b4/60c29c0d0d66230460bfa9e2_Pattern%20Shape.svg"
      >
        <VStack spacing={4} maxW="md">
          <Text fontWeight={600} fontSize="3xl" align="center" color="white">
            {heading}
          </Text>
        </VStack>

        <Button
          size="lg"
          color="green.500"
          backgroundColor="white"
          onClick={() => {}}
        >
          {cta.name}
        </Button>
      </VStack>
    </Container>
  );
};
