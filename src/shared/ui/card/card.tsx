import classNames from 'classnames';
import styles from './card.module.scss';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

