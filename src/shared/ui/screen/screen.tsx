import styles from './screen.module.scss';
import classNames from 'classnames';

interface ScreenProps {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Screen = ({ id, children, className, style }: ScreenProps) => {
  return (
    <section
      id={id}
      className={classNames(styles.screen, className)}
      style={style}
    >
      {children}
    </section>
  );
};

export default Screen;