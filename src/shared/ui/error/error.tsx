import classNames from 'classnames';
import styles from './error.module.scss';

interface ErrorProps {
  message: string | null;
  isVisible: boolean;
}

const Error = ({ message, isVisible }: ErrorProps) => {
  return (
    <div
      className={classNames(styles.error, !isVisible ? styles.hidden : null)}
    >
      <p className={styles['error-message']}>{message}</p>
    </div>
  );
};

export default Error;
