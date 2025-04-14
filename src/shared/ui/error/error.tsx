import classNames from 'classnames';
import styles from './error.module.scss';

type ErrorProps = {
  message: string | null | undefined;
  isVisible: boolean;
};

export const Error = ({ message, isVisible }: ErrorProps) => {
  return (
    <div
      className={classNames(styles.error, !isVisible ? styles.hidden : null)}
    >
      <p className={styles['error-message']}>{message}</p>
    </div>
  );
};
