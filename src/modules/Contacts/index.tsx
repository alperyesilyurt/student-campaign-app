import { services } from "@/common/services/services";
import Footer from "@/components/Footer";
import ContactForm from "@/components/forms/contact/ContactForm";
import Navbar from "@/components/Navbar";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export default function Contact() {
  const toast = useToast();
  const { t } = useTranslation();

  const contactMutation = useMutation(services.createContact);

  const handleSubmit = async (data: any) => {
    contactMutation.mutate(data);
  };

  if (contactMutation.isError) {
    toast({
      title: t("forms.contactForm.toast.errorTitle"),
      description: t("forms.contactForm.toast.errorDescription"),
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  if (contactMutation.isSuccess) {
    toast({
      title: t("forms.contactForm.toast.successTitle"),
      description: t("forms.contactForm.toast.successDescription"),
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  return (
    <div>
      <Navbar />
      <PageWrapper>
        <ContactForm
          handleFormSubmit={handleSubmit}
          isLoading={contactMutation.isLoading}
        />
      </PageWrapper>
      <Footer></Footer>
    </div>
  );
}
