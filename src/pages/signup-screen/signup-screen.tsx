import React, { FC, useRef } from 'react';
import s from 'src/pages/signup-screen/signup-screen.module.scss';
import { Formik } from 'formik';
import AuthForm from 'src/features/forms/auth-form/auth-form';
// import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useNavigate } from 'react-router-dom';
import { selectAuthErrorMessages, signup } from 'src/features/auth/auth-slice';
import { authFormValidate, initialAuthFormValues } from 'src/features/forms/forms-consts';

const SignupScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { t } = useTranslation();

  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);

  const authErrorMessages = useAppSelector(selectAuthErrorMessages);

  return (
    <main>
      <div className={s.welcomeText}>
        <div className={s.welcomeTextContainer}>
          <h2>Signup with Redux Thunk</h2>
          <Formik
            initialValues={initialAuthFormValues}
            validate={authFormValidate}
            onSubmit={(formData) => {
              dispatch(signup({ data: formData, navigate }));
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

export default SignupScreen;
