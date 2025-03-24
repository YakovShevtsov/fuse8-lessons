import { forwardRef } from 'react';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        {label && <label>{label}</label>}
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
          className={styles.input}
        />
      </>
    );
  }
);

