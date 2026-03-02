import { Profile } from 'src/features/profile/profile-consts';

export type SignUpBody = {
  email: string;
  password: string;
  commandId?: string;
};

export type SignupSuccessResponse = {
  token: string;
  profile: Profile;
};

export type SignInSuccessResponse = SignupSuccessResponse;

export type SignInBody = SignUpBody;
