import { services } from "@/common/services/services";
import CampaignCard, { Campaign } from "@/components/CampaignCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const { t } = useTranslation();

  async function getCampaigns() {
    const response = await services.getAllCampaigns();
    setTimeout(() => {
      setCampaigns(response?.data)
    }, 800);
  }
  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div>
      <h1>{t("companies")}</h1>
      {campaigns ? (
        campaigns?.map((campaign) => {
          return (
            <CampaignCard campaign={campaign} key={campaign.company.name} />
          );
        })
      ) : (
        <h5>{t("loading")}</h5>
      )}
    </div>
  );
}
