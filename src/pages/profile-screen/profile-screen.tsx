import React, { FC, useRef, useMemo } from 'react';
import ProfileForm from 'src/features/forms/profile-form/profile-form';
import { Formik } from 'formik';
import { FormikContext, initialValues } from 'src/features/forms/profile-form/profile-form-consts';
import { validate } from 'src/features/forms/profile-form/profile-form-utils';
import s from './profile-screen.module.scss';
import { useAppSelector } from 'src/store/hooks';
import { useTranslation } from 'react-i18next';

const ProfileScreen: FC = () => {
  const formElementRef = useRef<HTMLFormElement>(null);
  const autoFocusElementRef = useRef(null);
  const profile = useAppSelector((state) => state.profile.profile);
  const { t } = useTranslation();

  const profileInitialValues = useMemo(() => {
    if (profile) {
      return {
        // name: profile.name,
        email: profile.email,
      };
    }
    return initialValues;
  }, [profile]);

  return (
    <main className={s.main}>
      {profile && (
        <div className={s.profileInfo}>
          <h2>{t('screens.profile.profileInfo')}</h2>
          {/*<p>{t('screens.profile.name')}: {profile.name}</p>*/}
          <p>
            {t('screens.profile.email')}: {profile.email}
          </p>
          {/*<p>{t('screens.profile.role')}: {profile.role}</p>*/}
        </div>
      )}
      <Formik
        initialValues={profileInitialValues}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted:', values);
          resetForm();
        }}
        enableReinitialize
      >
        {(formik: FormikContext) => (
          <ProfileForm
            className={s.profileForm}
            formManager={formik}
            formElement={formElementRef}
            autoFocusElement={autoFocusElementRef}
          />
        )}
      </Formik>
    </main>
  );
};

export default ProfileScreen;
