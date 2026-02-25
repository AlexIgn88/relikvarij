import React, { FC, useRef } from 'react';
import s from 'src/pages/signup-redux-thunk-screen/signup-redux-thunk-screen.module.scss';
import { Formik } from 'formik';
import AuthForm from 'src/features/forms/auth-form/auth-form';
import { AuthFormValues } from 'src/features/forms/auth-form/types';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAuthErrorMessages, signupSagaRequest } from 'src/features/auth/auth-slice';

const initialValues: AuthFormValues = {
  email: '',
  password: '',
};

const SignupReduxSagaScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const authErrorMessages = useAppSelector(selectAuthErrorMessages);

  return (
    <main>
      <div className={s.welcomeText}>
        <div className={s.welcomeTextContainer}>
          <h2>Signup with Redux Saga</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={(formData) => {
              dispatch(signupSagaRequest({ data: formData, navigate }));
            }}
          >
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

export default SignupReduxSagaScreen;
