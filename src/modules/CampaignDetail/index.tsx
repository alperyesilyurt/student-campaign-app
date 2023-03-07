import { useGetCampaignByID } from "@/common/hooks/campaigns";
import ScrollToTop from "@/common/hooks/scroll-to-top";
import { services } from "@/common/services/services";
import { CampaignResponse } from "@/common/types/campaign.interface";
import { GetCouponCodeModal } from "@/components/PageSpecific/Campaign/GetCouponCodeModal";
import { NotAuthenticatedModal } from "@/components/PageSpecific/Campaign/NotAuthenticatedModal";
import { DefaultLayout } from "@/layouts";
import { selectIsLoggedIn } from "@/store/features";
import { useAppSelector } from "@/store/hooks";
import {
  Button,
  Center,
  Heading,
  Link,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ca } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CouponArea = styled.div`
  box-sizing: border-box;
  background: linear-gradient(90deg, #ff8e8e 1%, #9caeff 53.08%, #7cf2b8 100%);
  border-radius: 10px;
  width: 90%;
  padding: 52px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 25px 25px;
  }
`;
const GetCodeCardHeadline = styled.h4`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 50px;
  text-align: center;
  margin: 0;
`;

const CampaignDescription = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  padding: 30px;

  text-align: center;
`;
const CompanyLogoImage = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 20%;
  background-color: #878787;
  object-fit: contain;
  margin-top: -150px;
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    margin-top: -120px;
  }
`;

type campaignDetailProps = {
  campaignID?: string;
};
function getRandomArbitrary(min: number, max: number) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw "getRandomArbitrary requires two numbers as arguments";
  }
  if (min > max) {
    throw "getRandomArbitrary requires the first argument to be less than the second";
  }
  return Math.random() * (max - min) + min;
}

const loadingBGColors = [
  "green.200",
  "green.300",
  "orange.400",
  "orange.500",
  "green.700",
  "green.800",
  "green.400",
  "green.200",
  "green.100",
];

const CampaignLoading = () => {
  const [currentColor, setCurrentColor] = useState("green.100");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        getRandomArbitrary(0, loadingBGColors.length),
      );
      setCurrentColor(loadingBGColors[randomIndex]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center
      w={"100vw"}
      h={"100vh"}
      bg={currentColor}
      transition={"ease"}
      style={{
        transition: "background-color 0.3s ease",
      }}
    >
      <Heading color={"green"}> unilife </Heading>
    </Center>
  );
};

export default function CampaignDetail(props: campaignDetailProps) {
  const { campaignID } = props;
  const { t } = useTranslation();
  const params = useParams();

  const isUserLoggedIn = useSelector(selectIsLoggedIn);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingWithCode, setIsLoadingWithCode] = useState(false);
  const [campaignWithCode, setCampaignWithCode] =
    useState<CampaignResponse | null>(null);

  const campaignIDToFetch = params.id || campaignID;
  if (!campaignIDToFetch) {
    return <div>Invalid campaign ID</div>;
  }

  const singleCampaign = useGetCampaignByID(campaignIDToFetch);
  const getCampaignWithCode = async () => {
    setIsLoadingWithCode(true);
    const response = await services.getCampaignWithCodeByID(campaignIDToFetch);
    setCampaignWithCode(response);
    setTimeout(() => {
      setIsLoadingWithCode(false);
      onOpen();
    }, 2500);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNotAuthOpen,
    onOpen: onNotAuthOpen,
    onClose: onNotAuthClose,
  } = useDisclosure();

  useEffect(() => {
    if (singleCampaign.isSuccess) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3400);
    }
  }, [singleCampaign.isSuccess]);

  const getCouponCode = () => {
    if (!isUserLoggedIn) {
      onNotAuthOpen();
    }
    getCampaignWithCode();
  };

  return (
    <DefaultLayout>
      <Page>
        <ScrollToTop />
        {singleCampaign.isSuccess ? (
          <>
            <img
              src={singleCampaign.data.campaignHeroImage}
              style={{ width: "90%", objectFit: "contain", padding: "30px" }}
            />
            <CompanyLogoImage src={singleCampaign.data.company.logo} />
            <Link>{singleCampaign.data.company.name} </Link>
            <Heading>{singleCampaign.data.name}</Heading>
            <CampaignDescription>
              {singleCampaign.data.description}
            </CampaignDescription>

            <CouponArea>
              <GetCodeCardHeadline>
                %15 <br /> student discount
              </GetCodeCardHeadline>
              <Button
                colorScheme="green"
                bg={"black"}
                size={"lg"}
                onClick={() => getCouponCode()}
                isLoading={isLoadingWithCode}
              >
                Get Code
              </Button>
            </CouponArea>
            <CampaignDescription>
              {singleCampaign.data.description}
            </CampaignDescription>
          </>
        ) : (
          <h5>{t("errors.campaignDetail.fetchError")}</h5>
        )}
        <Slide direction="bottom" style={{ zIndex: 12 }} in={isLoading}>
          <CampaignLoading />
        </Slide>
        <GetCouponCodeModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        <NotAuthenticatedModal
          isOpen={isNotAuthOpen}
          onClose={onNotAuthClose}
          onOpen={onNotAuthOpen}
        />
      </Page>
    </DefaultLayout>
  );
}
