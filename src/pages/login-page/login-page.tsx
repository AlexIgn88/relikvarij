import React, { FC, useRef } from 'react';
import s from './login-page.module.scss';
import { Formik } from 'formik';
import AuthForm from 'src/features/forms/auth-form/auth-form';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAuthErrorMessages, signin } from 'src/features/auth/auth-slice';
import { authFormValidate, initialAuthFormValues } from 'src/features/forms/forms-consts';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const authErrorMessages = useAppSelector(selectAuthErrorMessages);

  return (
    <main>
      <div className={s.welcomeText}>
        <div className={s.welcomeTextContainer}>
          <h2>Login</h2>
          <Formik
            initialValues={initialAuthFormValues}
            validate={authFormValidate}
            onSubmit={(formData) => {
              dispatch(signin({ data: formData, navigate }));
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

export default LoginPage;
