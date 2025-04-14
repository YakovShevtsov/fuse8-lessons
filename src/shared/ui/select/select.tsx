import styles from './select.module.scss';

type Option = {
  text: string;
  value: string;
};

type SelectProps = {
  options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ options, ...props }: SelectProps) => {
  return (
    <select className={styles['select']} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
