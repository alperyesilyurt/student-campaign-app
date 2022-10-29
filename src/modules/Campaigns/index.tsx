import { useGetCampaigns } from "@/common/hooks/use-get-campaigns";
import CampaignCard from "@/components/CampaignCard";
import { useTranslation } from "react-i18next";
import './index.css';
import { AuthBackground } from "@/components/styled/constants";

export default function Campaigns() {
  const { t } = useTranslation();
  const { campaignResponseData, error, isCampaignsFetched, isCampaignsLoading } = useGetCampaigns()

  return (
    <div>
      <h1>{t("companies")}</h1>
      <h2>{isCampaignsFetched ? 'fetched' : 'NOT fetched'}</h2>
      <div className="campaign-container" >
      {isCampaignsFetched ? (
        campaignResponseData?.map((campaign, index) => {
          return (
            <CampaignCard
              campaign={campaign}
              key={campaign.company.name + index}
            />
          );
        })
      ) : (
        <h5>{t("loading")}</h5>
      )}
      </div>
    </div>
  );
}
