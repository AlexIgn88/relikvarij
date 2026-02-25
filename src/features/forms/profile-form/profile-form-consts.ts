import { ProfileFormValues } from 'src/features/forms/profile-form/types';
import { useFormikContext } from 'formik';

export const initialValues: ProfileFormValues = {
  name: '',
  about: '',
};

export type FormikContext = ReturnType<typeof useFormikContext<ProfileFormValues>>;
