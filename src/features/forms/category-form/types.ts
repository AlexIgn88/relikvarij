import { FormProps } from 'src/features/forms/types';

export type CategoryFormValues = {
  name: string;
  photo: string;
};

export type CategoryFormMode = 'create' | 'edit';

export type CategoryFormProps = FormProps<CategoryFormValues> & {
  mode?: CategoryFormMode;
};

