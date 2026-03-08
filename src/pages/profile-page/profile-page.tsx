import React, { FC } from 'react';

import s from './profile-page.module.scss';
import { useAppSelector } from 'src/store/hooks';
import { useTranslation } from 'react-i18next';

const ProfilePage: FC = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const { t } = useTranslation();

  return (
    <main className={s.main}>
      {profile && (
        <div className={s.profileInfo}>
          <h2>{t('screens.profile.profileInfo')}</h2>
          <p>
            {t('screens.profile.email')}: {profile.email}
          </p>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
