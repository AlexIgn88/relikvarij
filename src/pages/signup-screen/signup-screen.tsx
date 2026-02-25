import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import AuthForm from 'src/features/forms/auth-form/auth-form';
import { API, API_BASE_URL } from 'src/common/common-consts';

import { createFakeProfile } from 'src/features/profile/profile-consts';
import { saveTokenToStorage } from 'src/features/auth/auth-thunks';

import s from 'src/pages/signup-redux-thunk-screen/signup-redux-thunk-screen.module.scss';
import { setProfile } from 'src/features/profile/profile-slice';
import { useAppDispatch } from 'src/store/hooks';

const initialValues = {
  email: '',
  password: '',
};

const SignupScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);
  const [authErrorMessages, setAuthErrorMessages] = useState<string[]>([]);

  const handleSignup = async (formData: typeof initialValues) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API.SIGNUP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.errors) {
        console.log(result.errors);
        setAuthErrorMessages(result.errors.map((e: any) => e.message || 'Ошибка'));
        return;
      }

      const { token, profile } = result;

      // saveTokenToStorage(token);
      // createFakeProfile(token, profile);
      dispatch(saveTokenToStorage(token));
      dispatch(setProfile(createFakeProfile(token, profile)));

      navigate('/');
    } catch (err) {
      console.error(err);
      setAuthErrorMessages(['Произошла ошибка на сервере']);
    }
  };

  return (
    <main>
      <div className={s.welcomeText}>
        <div className={s.welcomeTextContainer}>
          <h2>Signup with functional component</h2>
          <Formik initialValues={initialValues} onSubmit={handleSignup}>
            {(formik) => (
              <AuthForm formManager={formik} formElement={formElementRef} autoFocusElement={autoFocusElementRef} />
            )}
          </Formik>
          {!!authErrorMessages.length && (
            <div className={s.error}>
              {authErrorMessages.map((msg) => (
                <div key={msg}>{msg}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SignupScreen;
