export enum EBilling {
  COUNTRY = "country",
  CITY = "city",
  PHONE_NUMBER = "phoneNumber",
  ADDRESS = "address",
  POSTAL_CODE = "postCode",
}

export interface IInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postCode: string;
  notes: string;
  spamCheck: boolean;
  policyCheck: boolean;
}
