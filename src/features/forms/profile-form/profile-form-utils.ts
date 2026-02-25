import { ProfileFormValues } from 'src/features/forms/profile-form/types';

export const validate = (values: ProfileFormValues): Partial<Record<keyof ProfileFormValues, string>> => {
  const errors: Partial<Record<keyof ProfileFormValues, string>> = {};

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (values.about && values.about.trim().length < 2) {
    errors.about = 'About must be at least 2 characters';
  }

  return errors;
};
