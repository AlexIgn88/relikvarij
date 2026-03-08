export type Profile = {
  id: string;
  signUpDate: string;
  email: string;
  password: string;
  __v: number;
};

export type LoadProfileSuccessResponse = {
  id: string;
  email: string;
  signUpDate: string;
};
