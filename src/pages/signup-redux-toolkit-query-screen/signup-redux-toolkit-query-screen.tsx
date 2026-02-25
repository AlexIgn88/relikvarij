import React, { FC, useRef, useState } from 'react';
import s from 'src/pages/signup-redux-thunk-screen/signup-redux-thunk-screen.module.scss';
import { Formik } from 'formik';
import AuthForm from 'src/features/forms/auth-form/auth-form';
import { AuthFormValues } from 'src/features/forms/auth-form/types';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from 'src/features/auth/auth-api';
import { useAppDispatch } from 'src/store/hooks';
import { saveTokenToStorage } from 'src/features/auth/auth-thunks';
import { setProfile } from 'src/features/profile/profile-slice';
import { createFakeProfile } from 'src/features/profile/profile-consts';
import { ApiError } from 'src/common/common-consts';

const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

const SignupReduxToolkitQueryScreen: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);
  const [signup] = useSignupMutation();
  const [authErrorMessages, setAuthErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (formData: AuthFormValues) => {
    try {
      setAuthErrorMessages([]);
      const result = await signup(formData).unwrap();
      const { token, profile } = result;
      dispatch(saveTokenToStorage(token));
      dispatch(setProfile(createFakeProfile(token, profile)));
      navigate('/');
    } catch (err: any) {
      if (err?.data && Array.isArray(err.data)) {
        setAuthErrorMessages(err.data.map((e: ApiError) => e.message || 'Ошибка'));
      } else {
        setAuthErrorMessages(['Произошла ошибка на сервере']);
      }
    }
  };

  return (
    <main>
      <div className={s.welcomeText}>
        <div className={s.welcomeTextContainer}>
          <h2>Signup with Redux Toolkit Query</h2>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => (
              <AuthForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
            )}
          </Formik>
          {!!authErrorMessages.length && (
            <div className={s.error}>
              {authErrorMessages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SignupReduxToolkitQueryScreen;
