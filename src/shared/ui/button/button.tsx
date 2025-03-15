import classNames from 'classnames';
import classes from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={classNames(classes.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
