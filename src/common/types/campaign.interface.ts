export interface CampaignResponse {
  _id: string;
  name: string;
  description: string;
  campaignHeroImage: string;
  campaignImages: any[];
  company: Company;
  validUntil: string;
  isVerified: boolean;
  isActive: boolean;
  isFeatured: boolean;
  featuredImage: string;
  __v: number;
  category: string;
  code: string;
}

export interface Company {
  _id: string;
  name: string;
  companyEmail: any;
  companyPhone: any;
  logo: string;
  bannerImage: any;
  website: any;
  country: any;
  city: any;
  disctrict: any;
  street: any;
  addressExplaination: any;
  postalCode: any;
  isVerified: boolean;
  __v: number;
}

export type Campaign = {
  _id: string;
  name?: string;
  description?: string;
  campaignHeroImage: string;
  campaignImages?: string[];
  company: { name: string; logo: string };
  validUntil: string;
};
