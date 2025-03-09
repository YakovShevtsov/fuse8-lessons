import { ButtonHTMLAttributes } from 'react';
import classes from './button.module.scss';

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
