import styles from './input.module.scss';
import cn from 'classnames';

type InputProps = {
  label?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = ({ label, textarea, className, ...props }: InputProps) => {
  return (
    <>
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea className={cn(styles.input, className)} {...props} />
      ) : (
        <input {...props} className={cn(styles.input, className)} />
      )}
    </>
  );
};
