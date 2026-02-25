import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { ProfileFormProps } from './types';
import NameField from './name-field/name-field';
import formStyle from '../form.module.scss';
import AboutField from './about-field/about-field';
import s from './profile-form.module.scss';

const ProfileForm = memo<ProfileFormProps>(({ className, formManager, formElement, autoFocusElement, disabled }) => {
  const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

  return (
    <form ref={formElement} onSubmit={handleSubmit} className={cn(s?.root, className)}>
      <NameField
        autoFocusElement={autoFocusElement}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
        errors={errors.name}
        submitCount={submitCount}
        touched={touched.name}
        disabled={disabled}
      />
      <AboutField
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.about}
        errors={errors.about}
        submitCount={submitCount}
        touched={touched.about}
        disabled={disabled}
      />
      <div className={formStyle.buttonContainer}>
        <div className={formStyle.buttonWrapper}>
          <Button type="primary" htmlType="submit" disabled={disabled} block>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
});

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
