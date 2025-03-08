import classes from './error.module.scss';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className={classes.error}>
      <p className={classes['error-message']}>{message}</p>
    </div>
  );
};

export default Error;
