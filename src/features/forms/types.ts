import type { InputRef } from 'antd/es/input';
import { useFormikContext } from 'formik';
import { MutableRefObject } from 'react';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager: ReturnType<typeof useFormikContext<Values>>;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<InputRef>;
}
