import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { CategoryFormProps } from 'src/features/forms/category-form/types';
import NameField from 'src/features/forms/product-operation-form/name-field/name-field';
import PhotoField from 'src/features/forms/product-operation-form/photo-field/photo-field';
import formStyle from 'src/features/forms/form.module.scss';
import s from './category-form.module.scss';

const CategoryForm = memo<CategoryFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }) => {
    const { t } = useTranslation();
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(s.root, className)}>
        <NameField
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          errors={errors.name || ''}
          submitCount={submitCount}
          touched={touched.name || false}
          disabled={disabled}
          label={t('forms.CategoryForm.name.title')}
          placeholder={t('forms.CategoryForm.name.placeholder')}
        />

        <PhotoField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.photo || ''}
          errors={errors.photo || ''}
          submitCount={submitCount}
          touched={touched.photo || false}
          disabled={disabled}
          label={t('forms.CategoryForm.photo.title')}
          placeholder={t('forms.CategoryForm.photo.placeholder')}
        />

        <div className={formStyle.buttonContainer}>
          <div className={formStyle.buttonWrapper}>
            <Button type="primary" htmlType="submit" disabled={disabled} block>
              {t('forms.CategoryForm.submit')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
);

CategoryForm.displayName = 'CategoryForm';

export default CategoryForm;

