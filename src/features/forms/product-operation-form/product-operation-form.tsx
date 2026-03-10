import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { ProductOperationFormProps } from './types';
import NameField from './name-field/name-field';
import PhotoField from './photo-field/photo-field';
import DescriptionField from './description-field/description-field';
import PriceField from './price-field/price-field';
import OldPriceField from './old-price-field/old-price-field';
import AmountField from './amount-field/amount-field';
import TypeField from './type-field/type-field';
import CategoryIdField from './category-id-field/category-id-field';
import s from './product-operation-form.module.scss';
import formStyle from 'src/features/forms/form.module.scss';
import { AdminActionType } from 'src/features/forms/product-operation-form/product-operation-form-consts';
import { useAppSelector } from 'src/store/hooks';
import { selectCategories } from 'src/entities/categories/categories-slice';
import { useTranslation } from 'react-i18next';

const ProductOperationForm = memo<ProductOperationFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled, mode }) => {
    const { t } = useTranslation();
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, setFieldValue } = formManager;

    const categories = useAppSelector(selectCategories);

    const categoryOptions = useMemo(
      () => categories.map((category) => ({ label: category.name, value: category.id })),
      [categories]
    );

    const isProduct = mode === AdminActionType.CreateProduct || mode === AdminActionType.EditProduct;
    const isOperation = mode === AdminActionType.CreateOperation || mode === AdminActionType.EditOperation;

    const handlePriceChange = (value: number | null) => {
      setFieldValue('price', value || 0);
    };

    const handleOldPriceChange = (value: number | null) => {
      setFieldValue('oldPrice', value || undefined);
    };

    const handleAmountChange = (value: number | null) => {
      setFieldValue('amount', value || 0);
    };

    const handleTypeChange = (value: 'Cost' | 'Profit') => {
      setFieldValue('type', value);
    };

    const handleCategoryChange = (value: string) => {
      setFieldValue('categoryId', value);
    };

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(s?.root, className)}>
        <NameField
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          errors={errors.name || ''}
          submitCount={submitCount}
          touched={touched.name || false}
          disabled={disabled}
          label={
            isProduct
              ? t('forms.ProductOperationForm.product.name.title')
              : t('forms.ProductOperationForm.operation.name.title')
          }
          placeholder={
            isProduct
              ? t('forms.ProductOperationForm.product.name.placeholder')
              : t('forms.ProductOperationForm.operation.name.placeholder')
          }
        />

        {isProduct && (
          <>
            <PhotoField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.photo || ''}
              errors={errors.photo || ''}
              submitCount={submitCount}
              touched={touched.photo || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.product.photo.title')}
              placeholder={t('forms.ProductOperationForm.product.photo.placeholder')}
            />

            <DescriptionField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.desc}
              errors={errors.desc || ''}
              submitCount={submitCount}
              touched={touched.desc || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.product.description.title')}
              placeholder={t('forms.ProductOperationForm.product.description.placeholder')}
            />

            <PriceField
              onBlur={handleBlur}
              onChange={handlePriceChange}
              value={values.price}
              errors={errors.price || ''}
              submitCount={submitCount}
              touched={touched.price || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.product.price.title')}
              placeholder={t('forms.ProductOperationForm.product.price.placeholder')}
            />

            <OldPriceField
              onBlur={handleBlur}
              onChange={handleOldPriceChange}
              value={values.oldPrice}
              errors={errors.oldPrice || ''}
              submitCount={submitCount}
              touched={touched.oldPrice || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.product.oldPrice.title')}
              placeholder={t('forms.ProductOperationForm.product.oldPrice.placeholder')}
            />
          </>
        )}

        {isOperation && (
          <>
            <DescriptionField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.desc}
              errors={errors.desc || ''}
              submitCount={submitCount}
              touched={touched.desc || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.operation.description.title')}
              placeholder={t('forms.ProductOperationForm.operation.description.placeholder')}
            />

            <AmountField
              onBlur={handleBlur}
              onChange={handleAmountChange}
              value={values.amount}
              errors={errors.amount || ''}
              submitCount={submitCount}
              touched={touched.amount || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.operation.amount.title')}
              placeholder={t('forms.ProductOperationForm.operation.amount.placeholder')}
            />

            <TypeField
              onBlur={handleBlur}
              onChange={handleTypeChange}
              value={values.type}
              errors={errors.type || ''}
              submitCount={submitCount}
              touched={touched.type || false}
              disabled={disabled}
              label={t('forms.ProductOperationForm.operation.type.title')}
            />
          </>
        )}

        <CategoryIdField
          onBlur={handleBlur}
          onChange={handleCategoryChange}
          value={values.categoryId || ''}
          errors={errors.categoryId || ''}
          submitCount={submitCount}
          touched={touched.categoryId || false}
          disabled={disabled}
          label={t('forms.ProductOperationForm.common.category.title')}
          placeholder={t('forms.ProductOperationForm.common.category.placeholder')}
          options={categoryOptions}
        />

        <div className={formStyle.buttonContainer}>
          <div className={formStyle.buttonWrapper}>
            <Button type="primary" htmlType="submit" disabled={disabled} block>
              {mode === 'createProduct' || mode === 'createOperation'
                ? t('forms.ProductOperationForm.common.submit.create')
                : t('forms.ProductOperationForm.common.submit.update')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
);

ProductOperationForm.displayName = 'ProductOperationForm';

export default ProductOperationForm;
