export type Company = {
  name: string;
  registeredUserEmail: string;
  registeredUserFullName: string;
  registeredUserPhone: string;

  companyEmail?: string;
  companyPhone?: string;
  logo?: string;
  bannerImage?: string;
  website?: string;
  password?: string;
  companyAddress?: {
    lat: number;
    lng: number;
  };
  country?: string;
  city?: string;
  district?: string;
  street?: string;
  addressExplaination?: string;
  postalCode?: number;
  isVerified: boolean;
};

export type CompanyState =
  | {
      isLoggedIn: false;
      company: null;
    }
  | {
      isLoggedIn: true;
      company: Company;
    };

  // {
  //   company?: Company;
  //   isLoggedIn: boolean;
  // }
