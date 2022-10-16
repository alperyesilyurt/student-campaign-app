import CampaignCard from "@/components/CampaignCard";


type Props = {};


const list = [
  {
    campaignHeroImage: "https://images.deliveryhero.io/image/fd-tr/campaign-assets/fadfab03-463c-11ed-b8b1-660950efa710/desktop_tile_TrvWPU.jpg?height=240&quality=95&width=560&",
    company:
    {
      name : "Pizza Hut",
      logo : "https://images.deliveryhero.io/image/fd-tr/campaign-assets/fadfab03-463c-11ed-b8b1-660950efa710/desktop_tile_TrvWPU.jpg?height=240&quality=95&width=560&"
    },
    validUntil: "06 Aug 2020",
  },  {
    campaignHeroImage: "https://images.deliveryhero.io/image/fd-tr/campaign-assets/fadfab03-463c-11ed-b8b1-660950efa710/desktop_tile_TrvWPU.jpg?height=240&quality=95&width=560&",
    company:
    {
      name : "Pizzann Hut",
      logo : "https://images.deliveryhero.io/image/fd-tr/campaign-assets/fadfab03-463c-11ed-b8b1-660950efa710/desktop_tile_TrvWPU.jpg?height=240&quality=95&width=560&"
    },
    validUntil: "06 Aug 2020",
  },
];

export default function index({}: Props) {
  return (
    <div>
      <h1>Campaigns</h1>
      {list.map((campaign) => {
        return (
          <CampaignCard campaign={campaign} key={campaign.company.name}/>
        );
      })}
    </div>
  );
}
