export interface Category {
  _id: string;
  name: string;
  description: string;
  subCategories: any[];
  parentCategory: string;
  image: string;
  tags: any[];
  createdAt: string;
  updatedAt: string;
}
export interface Campaign {}

export interface CampaignState {
  categories: Category[];
}
