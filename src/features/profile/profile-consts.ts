//моковый профиль для предыдущего задания
export type Profile = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

//настоящий профиль, который приходит с сервера
export type UserProfile = {
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

//моковый профиль для предыдущего задания
export const createFakeProfile = (
  token: string,
  profileData: { email: string; password: string } = { email: 'john.doe@example.com', password: '111' }
): Profile => {
  const isAdmin = token.includes('admin') || token.length % 2 === 0;
  const { email, password } = profileData;

  return {
    id: '1',
    name: 'John Doe',
    email: email,
    password: password,
    role: isAdmin ? 'admin' : 'user',
  };
};
