import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  textarea?: boolean;
  label?: string;
}

const Input = ({ label, textarea, ...props }: InputProps) => {
  return (
    <>
      {label && <label>{label}</label>}
      {textarea ? <textarea /> : <input {...props} className={styles.input} />}
    </>
  );
};

export default Input;
